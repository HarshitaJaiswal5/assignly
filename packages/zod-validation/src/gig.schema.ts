import { z } from 'zod';

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format');

export const gigFilterSchema = z
  .object({
    search: z.string().trim().optional(),
    subject: z.string().trim().optional(),
    address: z.string().trim().optional(),
    radius: z.coerce.number().positive().optional(),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lon: z.coerce.number().min(-180).max(180).optional(),
    startDate: dateOnly.optional(),
    endDate: dateOnly.optional(),
  })
  .refine(
    (data) =>
      (data.lat === undefined && data.lon === undefined) ||
      (data.lat !== undefined && data.lon !== undefined),
    {
      message: 'Latitude and longitude must be provided together',
      path: ['lat'],
    }
  )
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      data.startDate <= data.endDate,
    {
      message: 'Start date cannot be after end date',
      path: ['startDate'],
    }
  );

export type GigFilterParams = z.infer<typeof gigFilterSchema>;