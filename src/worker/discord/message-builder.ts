import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Task } from '../../task/task';
import { Priority, PriorityEmoji } from '../../task/priority';
import { User } from '../../task/user';

dayjs.extend(utc);
dayjs.extend(timezone);

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

  private buildDueDateLabel(diff: number): string {
    if (diff === 0) {
      return '오늘까지';
    } else if (diff < 0) {
      return `${-diff}일 남음`;
    } else {
      return `${diff}일 초과`;
    }
  }

  private buildDueDateString(dueDateUTC: Date | null): string {
    if (!dueDateUTC) {
      return '만기일 없음';
    }

    const todayKST = dayjs.utc(new Date()).tz('Asia/Seoul').startOf('day');
    const dueDateKST = dayjs.utc(dueDateUTC).tz('Asia/Seoul').startOf('day');

    const dayDiff = todayKST.diff(dueDateKST, 'day');

    const formattedDueDate = dueDateKST.format('YYYY.MM.DD.');
    const label = this.buildDueDateLabel(dayDiff);

    return `~ ${formattedDueDate} (${label})`;
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
