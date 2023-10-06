import { Priority } from './priority';
import { User } from './user';

export type TaskUsers = {
  readonly from: User;
  readonly to: User[];
};

export class Task {
  constructor(
    readonly id: string,
    readonly projectId: string,
    readonly priority: Priority,
    readonly subject: string,
    readonly taskNumber: string,
    readonly dueDate: Date | null,
    readonly users: TaskUsers,
    readonly createdAt: Date,
  ) {}
}
