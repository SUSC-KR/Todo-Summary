import { ProjectIdIndex } from './index/project-id-index';
import { TaskIdIndex } from './index/task-id-index';
import { ToUserIndex } from './index/to-user-index';
import { Task } from './task';

export class TaskContainer {
  private readonly taskIdIndex: TaskIdIndex;
  private readonly projectIdIndex: ProjectIdIndex;
  private readonly toUserIndex: ToUserIndex;

  constructor() {
    this.taskIdIndex = new TaskIdIndex();
    this.projectIdIndex = new ProjectIdIndex();
    this.toUserIndex = new ToUserIndex();
  }

  register(task: Task): void {
    this.taskIdIndex.register(task);
    this.projectIdIndex.register(task);
    this.toUserIndex.register(task);
  }

  findByTaskId(taskId: string): Task | null {
    const tasks = this.taskIdIndex.findByIndex(taskId);

    if (tasks.length === 0) return null;
    else return tasks[0];
  }

  findByProjectId(projectId: string): Task[] {
    return this.projectIdIndex.findByIndex(projectId);
  }

  // userIdentity는 memberId이거나 groupId.
  findByUserIdentity(userIdentity: string): Task[] {
    return this.toUserIndex.findByIndex(userIdentity);
  }
}
