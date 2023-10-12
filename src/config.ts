import * as dotenv from 'dotenv';
import { split } from './util';

dotenv.config();

type ConfigurationType = {
  projectIds: string[];
  doorayApiKey: string;
  teamIds: string[];
  teamMemberMap: { teamId: string; memberIds: string[] }[];
  teamGroupMap: { teamId: string; groupIds: string[] }[];
  teamChannelMap: { teamId: string; channelId: string | null }[];
};

export const Configuration: ConfigurationType = {
  projectIds: split(process.env.PROJECT_IDS, ','),
  doorayApiKey: process.env.DOORAY_API_KEY || 'none',
  teamIds: split(process.env.TEAM_IDS, ','),
  teamMemberMap: JSON.parse(process.env.TEAM_MEMBER_MAP || '[]'),
  teamGroupMap: JSON.parse(process.env.TEAM_GROUP_MAP || '[]'),
  teamChannelMap: JSON.parse(process.env.TEAM_CHANNEL_MAP || '[]'),
};
