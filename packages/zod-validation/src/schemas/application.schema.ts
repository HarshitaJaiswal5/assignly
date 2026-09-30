import { z } from 'zod';

export const createApplicationSchema = z.object({
  negotiatedPrice: z
    .number()
    .positive('Negotiated price must be greater than zero'),
});

export const applicationParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
export type ApplicationParamsSchema = z.infer<typeof applicationParamsSchema>;