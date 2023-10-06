import { Task } from '../task';
import { ITaskIndex } from './task-index';

export class ProjectIdIndex implements ITaskIndex<string> {
  private readonly projectMap: Record<string, Task[]>;

  constructor() {
    this.projectMap = {};
  }

  register(task: Task): void {
    const prevTaskList: Task[] | undefined = this.projectMap[task.projectId];

    if (prevTaskList) {
      prevTaskList.push(task);
    } else {
      this.projectMap[task.projectId] = [task];
    }
  }

  findByIndex(index: string): Task[] {
    return this.projectMap[index] ?? [];
  }
}
