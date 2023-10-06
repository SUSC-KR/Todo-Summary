import { User } from '../user';
import { Task } from '../task';
import { ITaskIndex } from './task-index';

export class ToUserIndex implements ITaskIndex<string> {
  private readonly toUserMap: Record<string, Task[]>;

  constructor() {
    this.toUserMap = {};
  }

  register(task: Task): void {
    task.users.to.map((user) => {
      const userIdentity = this.getUserIdentity(user);

      const prevTaskList: Task[] | undefined = this.toUserMap[userIdentity];

      if (prevTaskList) {
        prevTaskList.push(task);
      } else {
        this.toUserMap[userIdentity] = [task];
      }
    });
  }

  findByIndex(index: string): Task[] {
    return this.toUserMap[index] ?? [];
  }

  private getUserIdentity(user: User): string {
    switch (user.type) {
      case 'member':
        return user.member.organizationMemberId;
      case 'group':
        return user.group.projectMemberGroupId;
    }
  }
}
