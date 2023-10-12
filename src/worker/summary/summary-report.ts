import { Task } from '../../task/task';

export type Summary = {
  project: {
    id: string;
    name: string;
  };
  group: Task[];
  members: Task[];
};

export type TeamSummary = {
  teamId: string;
  summary: Summary[];
};

export type SummaryReport = TeamSummary[];
