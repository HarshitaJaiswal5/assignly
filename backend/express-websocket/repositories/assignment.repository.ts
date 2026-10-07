import { Prisma, prisma } from '@repo/prisma/db';
import type { GigFilterParams } from '@repo/zod-validation/types';

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const calculateDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
) => {
  const lat1 = toRadians(latitude1);
  const lat2 = toRadians(latitude2);

  const deltaLatitude = toRadians(latitude2 - latitude1);
  const deltaLongitude = toRadians(longitude2 - longitude1);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

export const assignmentRepository = {
  getGigs: async (filters: GigFilterParams) => {
    const {
      search,
      subject,
      address,
      radius,
      lat,
      lon,
      startDate,
      endDate,
    } = filters;

    const where: Prisma.AssignmentWhereInput = {
      status: {
        not: 'SUBMITTED',
      },
    };

    // Subject filter
    if (subject) {
      where.subject = {
        has: subject,
      };
    }

    // Search filter
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          instructions: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          deliveryAddress: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Address filter
    if (address) {
      where.deliveryAddress = {
        contains: address,
        mode: 'insensitive',
      };
    }

    // Date filter
    if (startDate || endDate) {
      where.deliveryDate = {
        ...(startDate && {
          gte: new Date(`${startDate}T00:00:00`),
        }),
        ...(endDate && {
          lte: new Date(`${endDate}T00:00:00`),
        }),
      };
    }

    /*
     * Location pre-filter
     *
     * Use a bounding box first to reduce the number
     * of gigs for which we need to calculate distance.
     */
    if (
      lat !== undefined &&
      lon !== undefined &&
      radius !== undefined
    ) {
      const latitudeDelta = radius / 111.32;

      const longitudeDelta =
        radius / (111.32 * Math.cos(toRadians(lat)));

      const minLatitude = lat - latitudeDelta;
      const maxLatitude = lat + latitudeDelta;

      const minLongitude = lon - longitudeDelta;
      const maxLongitude = lon + longitudeDelta;

      where.deliveryLatitude = {
        gte: minLatitude,
        lte: maxLatitude,
      };

      where.deliveryLongitude = {
        gte: minLongitude,
        lte: maxLongitude,
      };
    }

    const gigs = await prisma.assignment.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            emailVerified: true,
          },
        },
      },
    });

    // No location → return normally
    if (lat === undefined || lon === undefined) {
      return gigs;
    }

    const gigsWithDistance = gigs.map((gig) => {
      const gigLatitude = Number(gig.deliveryLatitude);
      const gigLongitude = Number(gig.deliveryLongitude);

      const distance = calculateDistance(
        lat,
        lon,
        gigLatitude,
        gigLongitude
      );

      return {
        ...gig,
        distance,
      };
    });

    // Location provided but no radius → nearest first
    if (radius === undefined) {
      return gigsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
    }

    // Location + radius → filter and sort by distance
    return gigsWithDistance
      .filter((gig) => gig.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
  },

  getGigDetails: async (gigId: string) => {
    return prisma.assignment.findUnique({
      where: {
        id: gigId,
      },
      include: {
        user: {
          select: {
            name: true,
            emailVerified: true,
          },
        },
      },
    });
  },
};