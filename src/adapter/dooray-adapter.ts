import * as axios from 'axios';
import { Configuration } from '../config';
import { DoorayPaginatedResponse, DoorayResponse } from './dto/common.dto';
import { ListMemberGroupResponseDto } from './dto/list-member-group.dto';
import { ListTaskResponseDto } from './dto/list-task.dto';

export class DoorayAdapter {
  private client: axios.AxiosInstance;

  constructor() {
    this.client = axios.default.create({
      baseURL: 'https://api.dooray.com/',
      headers: {
        Authorization: `dooray-api ${Configuration.doorayApiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async listMemberGroup(
    projectId: string
  ): Promise<DoorayResponse<ListMemberGroupResponseDto>> {
    const response = await this.client.get(
      `/project/v1/projects/${projectId}/member-groups`
    );
    return response.data;
  }

  async listOpenedTask(
    projectId: string,
    page: number
  ): Promise<DoorayPaginatedResponse<ListTaskResponseDto>> {
    const response = await this.client.get(
      `/project/v1/projects/${projectId}/posts`,
      {
        params: {
          size: 100,
          page,
          postWorkflowClasses: 'backlog,registered,working',
        },
      }
    );
    return response.data;
  }
}
