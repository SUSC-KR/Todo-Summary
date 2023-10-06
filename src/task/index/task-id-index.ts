import { Task } from '../task';
import { ITaskIndex } from './task-index';

export class TaskIdIndex implements ITaskIndex<string> {
  private readonly idMap: Record<string, Task>;

  constructor() {
    this.idMap = {};
  }

  register(task: Task): void {
    this.idMap[task.id] = task;
  }

  findByIndex(index: string): Task[] {
    return this.idMap[index] ? [this.idMap[index]] : [];
  }
}
