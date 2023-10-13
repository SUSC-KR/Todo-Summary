import { Task } from 'task/task';
import { User } from '../../task/user';
import { Priority, PriorityEmoji } from '../../task/priority';

export class MessageBuilder {
  buildProjectTitle(projectName: string): string {
    return `## ${projectName}`;
  }

  private buildPriority(priority: Priority): string {
    return PriorityEmoji[priority];
  }

  private buildTaskUrl(taskId: string): string {
    return `https://susckr.dooray.com/task/all/${taskId}`;
  }

  private buildDueDateString(dueDate: Date | null): string {
    return dueDate?.toISOString() ?? '만기일 없음';
  }

  private buildCreator(user: User): string {
    if (user.type === 'group') {
      return '생성자: 그룹';
    } else {
      return `생성자: ${user.member.name}`;
    }
  }

  private buildSubject(
    subject: string,
    taskNumber: string,
    taskId: string,
  ): string {
    return `${subject} [(${taskNumber})](${this.buildTaskUrl(taskId)})`;
  }

  build(task: Task): string {
    const { id, subject, taskNumber, priority, dueDate, users } = task;

    const messageElements = [
      this.buildPriority(priority),
      this.buildSubject(subject, taskNumber, id),
      this.buildDueDateString(dueDate),
      this.buildCreator(users.from),
    ];

    return `- ${messageElements.join(' | ')}`;
  }
}
