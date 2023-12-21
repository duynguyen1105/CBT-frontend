import { UserType } from './user';

export type WorkspaceType = {
  _id: string;
  name: string;
  domain: string;
  status: string;
  typeWorkspace: string;
  storage: number;
  adminWorkspace: UserType[];
  ownerWorkspace: UserType;
  createdAt: string;
  updatedAt: string;
  totalUsers: number;
  totalQuestions: number;
  totalTests: number;
};
