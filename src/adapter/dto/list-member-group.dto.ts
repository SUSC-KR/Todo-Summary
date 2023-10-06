export type ListMemberGroupResponseDto = {
  id: string;
  code: string;
  project: {
    id: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
}[];
