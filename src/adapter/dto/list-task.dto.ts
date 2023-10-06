import { User } from '../../task/user';
import { Priority } from '../../task/priority';

// 필요한 데이터만 정의되어 있습니다.
// 실제로는 더 많은 데이터가 존재합니다.
export type ListTaskResponseDto = {
  id: string;
  subject: string;
  project: {
    id: string;
    code: string;
  };
  taskNumber: string;
  createdAt: string;
  dueDate: string | undefined;
  priority: Priority;
  users: {
    from: User;
    to: User[];
  };
};
