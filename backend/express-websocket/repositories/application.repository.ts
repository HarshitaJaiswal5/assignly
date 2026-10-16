
import { prisma } from '@repo/prisma/db';
import { ApiError } from '@utils/ApiError.js';
import type { CreateApplicationInput } from '@repo/zod-validation/types';

export const applicationRepository = {
  createApplication: async ({
    gigId,
    userId,
    negotiatedPrice,
  }: CreateApplicationInput) => {
    const gig = await prisma.assignment.findUnique({
      where: { id: gigId },
      select: {
        id: true,
        title: true,
        postedBy: true,
      },
    });

    if (!gig) {
      throw new ApiError(404, 'Gig not found');
    }

    if (gig.postedBy === userId) {
      throw new ApiError(400, 'You cannot apply to your own gig');
    }

    const applicant = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
      },
    });

    if (!applicant) {
      throw new ApiError(404, 'Applicant not found');
    }

    const application = await prisma.application.create({
      data: {
        gigId,
        applicantId: userId,
        negotiatedPrice,
      },
    });

    return {
      ...application,
      gigTitle: gig.title,
      applicantName: applicant.name ?? 'A student',
      postedByUserId: gig.postedBy,
    };
  },
};
