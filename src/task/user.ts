export type Member = {
  organizationMemberId: string;
  name: string;
};

export type Group = {
  projectMemberGroupId: string;
  code: string;
  members: Member[];
};

export type User =
  | { type: 'member'; member: Member }
  | { type: 'group'; group: Group };
