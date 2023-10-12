import { Configuration } from '../../config';
import { DoorayAdapter } from '../../adapter/dooray-adapter';
import { Summary, SummaryReport, TeamSummary } from './summary-report';
import { Project, Task } from '../../task/task';
import { ListTaskResponseDto } from '../../adapter/dto/list-task.dto';
import { randomInt, sleep } from '../../util';

type TeamSummaryMap = Record<string, TeamSummary>;
type GroupTeamMap = Record<string, string>;
type MemberTeamMap = Record<string, string>;
type TeamGroupMap = (typeof Configuration)['teamGroupMap'];
type TeamMemberMap = (typeof Configuration)['teamMemberMap'];

export class SummaryWorker {
  readonly doorayAdapter: DoorayAdapter;

  constructor() {
    this.doorayAdapter = new DoorayAdapter();
  }

  async work(): Promise<SummaryReport> {
    const { projectIds, teamIds, teamGroupMap, teamMemberMap } = Configuration;
    const summary: TeamSummaryMap = {};

    const groupTeamMap = this.generateGroupTeamMap(teamGroupMap);
    const memberTeamMap = this.generateMemberTeamMap(teamMemberMap);
    this.registerTeams(summary, teamIds);

    for (const projectId of projectIds) {
      const tasks = await this.fetchTasksByProject(projectId);
      tasks.forEach((task) => {
        task.users.to.forEach((user) => {
          let teamId: string;
          if (user.type === 'member') {
            teamId = memberTeamMap[user.member.organizationMemberId];
          } else {
            teamId = groupTeamMap[user.group.projectMemberGroupId];
          }

          let teamSummary: TeamSummary = summary[teamId];
          if (!teamSummary) {
            summary[teamId] = summary[teamId] ?? {
              teamId,
              summary: [],
            };
          }

          const NO_SUMMARY = -1;
          const prevSummaryIdx: number = teamSummary.summary.findIndex(
            (summary) => summary.project.id === task.project.id,
          );

          let prevSummary: Summary;
          if (prevSummaryIdx === NO_SUMMARY) {
            const newSummary: Summary = {
              project: {
                id: task.project.id,
                name: task.project.code,
              },
              members: [],
              group: [],
            };
            teamSummary.summary.push(newSummary);
            prevSummary = newSummary;
          } else {
            prevSummary = teamSummary.summary[prevSummaryIdx];
          }

          if (user.type === 'member') {
            prevSummary.members.push(task);
          } else {
            prevSummary.group.push(task);
          }

          summary[teamId] = teamSummary;
        });
      });
    }

    return Object.values(summary);
  }

  private generateGroupTeamMap(teamGroupMap: TeamGroupMap): GroupTeamMap {
    const result: GroupTeamMap = {};

    teamGroupMap.forEach(({ teamId, groupIds }) => {
      groupIds.forEach((groupId) => (result[groupId] = teamId));
    });

    return result;
  }

  private generateMemberTeamMap(teamMemberMap: TeamMemberMap): MemberTeamMap {
    const result: MemberTeamMap = {};

    teamMemberMap.forEach(({ teamId, memberIds }) => {
      memberIds.forEach((memberId) => (result[memberId] = teamId));
    });

    return result;
  }

  private registerTeams(summary: TeamSummaryMap, teamIds: string[]): void {
    teamIds.forEach((teamId) => {
      summary[teamId] = { teamId, summary: [] };
    });
  }

  private async fetchTasksByProject(projectId: string): Promise<Task[]> {
    const tasks: Task[] = [];

    for (let page = 0; true; page++) {
      const response = await this.doorayAdapter.listOpenedTask(projectId, page);

      if (response.result.length === 0) {
        break;
      }

      tasks.push(...response.result.map(this.taskDtoToTask));
      await sleep(randomInt(250, 500));
    }

    return tasks;
  }

  private taskDtoToTask(taskDto: ListTaskResponseDto): Task {
    return new Task(
      taskDto.id,
      new Project(taskDto.project.id, taskDto.project.code),
      taskDto.priority,
      taskDto.subject,
      taskDto.taskNumber,
      taskDto.dueDate ? new Date(taskDto.dueDate) : null,
      taskDto.users,
      new Date(taskDto.createdAt),
    );
  }
}
