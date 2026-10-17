import { Prisma } from '@repo/prisma/db';

export type AssignmentRecord = Prisma.AssignmentGetPayload<{}>;

export type ApplicationRecord = Prisma.ApplicationGetPayload<{}>;

export type PostedAssignment = AssignmentRecord & {
  _id: string;
};

export type RequestedAssignment = AssignmentRecord & {
  _id: string;
  applicationId: ApplicationRecord['id'];
  applicationStatus: ApplicationRecord['status'];
  negotiatedPrice: ApplicationRecord['negotiatedPrice'];
  appliedAt: ApplicationRecord['createdAt'];
};