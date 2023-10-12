import { Priority } from './priority';
import { User } from './user';

export type TaskUsers = {
  readonly from: User;
  readonly to: User[];
};

export class Project {
  constructor(readonly id: string, readonly code: string) {}
}

export class Task {
  constructor(
    readonly id: string,
    readonly project: Project,
    readonly priority: Priority,
    readonly subject: string,
    readonly taskNumber: string,
    readonly dueDate: Date | null,
    readonly users: TaskUsers,
    readonly createdAt: Date,
  ) {}
}
