export type DoorayResponseHeader = {
  resultCode: number;
  resultMessage: string;
  isSuccessful: boolean;
};

export type DoorayResponse<T = any> = {
  header: DoorayResponseHeader;
  result: T;
};

export type DoorayPaginatedResponse<T = any> = {
  header: DoorayResponseHeader;
  result: T[];
  totalCount: number;
};
