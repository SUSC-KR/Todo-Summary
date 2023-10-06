import { split } from './util';

type ConfigurationType = {
  projectIds: string[];
  doorayApiKey: string;
};

export const Configuration: ConfigurationType = {
  projectIds: split(process.env.PROJECT_IDS, ','),
  doorayApiKey: process.env.DOORAY_API_KEY ?? 'none',
};
