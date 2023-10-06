import { Task } from '../task';

export interface ITaskIndex<TIndex> {
  register(task: Task): void;
  findByIndex(index: TIndex): Task[];
}
