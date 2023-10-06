import { Configuration } from '../../config';
import { DoorayAdapter } from '../../adapter/dooray-adapter';
import { TaskContainer } from '../../task/task-container';
import { SummaryReport } from './summary-report';

export class SummaryWorker {
  readonly taskContainer: TaskContainer;
  readonly doorayAdapter: DoorayAdapter;

  constructor() {
    this.taskContainer = new TaskContainer();
    this.doorayAdapter = new DoorayAdapter();
  }

  async work(): Promise<SummaryReport> {
    const projectIds = Configuration.projectIds;

    return {};
  }
}
