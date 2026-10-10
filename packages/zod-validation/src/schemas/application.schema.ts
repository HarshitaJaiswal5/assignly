
import { z } from 'zod';

export const createApplicationSchema = z.object({
  negotiatedPrice: z
    .number()
    .positive('Negotiated price must be greater than zero'),
});

export const applicationParamsSchema = z.object({
  id: z.string().uuid('Invalid gig ID'),
});

// Internal service/repository input
export const createApplicationInputSchema = z.object({
  gigId: z.string().uuid('Invalid gig ID'),
  userId: z.string().uuid('Invalid user ID'),
  negotiatedPrice: z
    .number()
    .positive('Negotiated price must be greater than zero'),
});

export const gigApplicationReceivedSchema = z.object({
  gigId: z.string(),
  applicationId: z.string(),
  applicantId: z.string(),
  applicantName: z.string(),
  postedByUserId: z.string(),
  negotiatedPrice: z.coerce.number().positive(),
});

export const gigApplicationRejectedSchema = z.object({
  gigId: z.string().uuid(),
  applicationId: z.string().uuid(),
  applicantId: z.string().uuid(),
  postedByUserId: z.string().uuid(),
  gigTitle: z.string(),
  reason: z.string().optional(),
});

export type CreateApplicationSchema = z.infer<
  typeof createApplicationSchema
>;

export type ApplicationParamsSchema = z.infer<
  typeof applicationParamsSchema
>;

export type CreateApplicationInput = z.infer<
  typeof createApplicationInputSchema
>;

export type GigApplicationReceivedSchema = z.infer<
  typeof gigApplicationReceivedSchema
>;

export type GigApplicationRejectedSchema = z.infer<
  typeof gigApplicationRejectedSchema
>;
