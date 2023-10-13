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
      tasks.forEach((task) => {
        result += this.messageBuilder.build(task) + '\n';
      });
    });

    result += '\n';

    // 멤버에게 할당된 Task 목록 빌드
    summary.members.forEach(({ member, tasks }) => {
      result += `@${member.name}` + '\n';
      tasks.forEach((task) => {
        result += this.messageBuilder.build(task) + '\n';
      });
    });

    result += '\n';

    return result;
  }
}
