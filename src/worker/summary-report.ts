import { Task } from '../task/task';

export type GroupTask = {
  group: {
    id: string;
    name: string;
  };
  tasks: Task[];
};

export type MemberTask = {
  member: {
    id: string;
    name: string;
  };
  tasks: Task[];
};

export type Summary = {
  project: {
    id: string;
    name: string;
  };
  groups: GroupTask[];
  members: MemberTask[];
};

export type TeamSummary = {
  teamId: string;
  summary: Summary[];
};

export type SummaryReport = TeamSummary[];
