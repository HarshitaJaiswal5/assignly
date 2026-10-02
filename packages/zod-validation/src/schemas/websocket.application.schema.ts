import { z } from 'zod';

export const gigApplicationReceivedSchema = z.object({
  gigId: z.string(),
  applicationId: z.string(),
  postedByUserId: z.string(),
  applicantId: z.string(),
  applicantName: z.string(),
  negotiatedPrice: z.number(),
});

export const gigApplicationRejectedSchema = z.object({
  gigId: z.string(),
  applicationId: z.string(),
  applicantId: z.string(),
  postedByUserId: z.string(),
  gigTitle: z.string(),
  reason: z.string().optional(),
});

export type GigApplicationReceivedPayload =
  z.infer<typeof gigApplicationReceivedSchema>;

export type GigApplicationRejectedPayload =
  z.infer<typeof gigApplicationRejectedSchema>;