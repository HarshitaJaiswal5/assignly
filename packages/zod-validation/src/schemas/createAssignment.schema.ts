import { z } from 'zod';

export const createAssignmentSchema = z.object({
  title: z.string().trim().min(3).max(150),
  description: z.string().trim().min(10).max(5000),
  descriptionPDF: z.string().url().nullable().optional(),
  referencePDF: z.string().url().nullable().optional(),
  instructions: z.string().trim().max(2000).nullable().optional(),
  subject: z.array(z.string().trim().min(1)).min(1),
  amount: z.coerce.number().positive(),
  deliveryDate: z.coerce.date(),
  deliveryAddress: z.string().trim().min(3),
  deliveryLatitude: z.number().min(-90).max(90),
  deliveryLongitude: z.number().min(-180).max(180),
  additionalStationary: z.array(z.string()).optional(),
  additionalStationaryAmount: z.coerce.number().nonnegative().optional(),
});

export type CreateAssignmentParams = z.infer<typeof createAssignmentSchema>;
