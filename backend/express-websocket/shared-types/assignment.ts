import { Prisma } from '@repo/prisma/db';


export type ApplicationRecord = Prisma.ApplicationGetPayload<{}>;

export type AssignmentRecord = Prisma.AssignmentGetPayload<{}>;

export type PostedAssignment = AssignmentRecord;

export type RequestedAssignment = AssignmentRecord & {
  applicationId: ApplicationRecord['id'];
  applicationStatus: ApplicationRecord['status'];
  negotiatedPrice: ApplicationRecord['negotiatedPrice'];
  appliedAt: ApplicationRecord['createdAt'];
};