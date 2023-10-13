import { Task } from '../../task/task';
import { PriorityOrder } from '../../task/priority';
import { Summary } from '../../worker/summary-report';
import { MessageBuilder } from './message-builder';

export class ReportBuilder {
  private messageBuilder: MessageBuilder;

  constructor() {
    this.messageBuilder = new MessageBuilder();
  }

  build(teamId: string, summary: Summary): string {
    let result: string = '';

    // 헤더 빌드
    result +=
      this.messageBuilder.buildProjectTitle(summary.project.name) + '\n';

    result += '\n';

    // 그룹에 할당된 Task 목록 빌드
    summary.groups.forEach(({ group, tasks }) => {
      result += `@${group.name}` + '\n';
      tasks.sort(this.taskSortCompare).forEach((task) => {
        result += this.messageBuilder.build(task) + '\n';
      });
    });

    result += '\n';

    // 멤버에게 할당된 Task 목록 빌드
    summary.members.forEach(({ member, tasks }) => {
      result += `@${member.name}` + '\n';
      tasks.sort(this.taskSortCompare).forEach((task) => {
        result += this.messageBuilder.build(task) + '\n';
      });
    });

    result += '\n';

    return result;
  }

  private taskSortCompare(a: Task, b: Task): number {
    // 1차 정렬 조건
    const priorityDiff = PriorityOrder[a.priority] - PriorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // 2차 정렬 조건
    if (!a.dueDate) return 1;
    else if (!b.dueDate) return -1;
    const dueDateDiff = a.dueDate.getTime() - b.dueDate.getTime();
    if (dueDateDiff !== 0) return dueDateDiff;

    // 3차 정렬 조건
    return a.createdAt.getTime() - b.createdAt.getTime();
  }
}
