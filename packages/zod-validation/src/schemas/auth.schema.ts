import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.string().min(1),
  email: z
  .string()
  .email("Invalid email format") 
  .endsWith("@gmail.com", "Only Google Mail accounts are allowed"),
  name: z.string().min(1),
  image: z.url().optional(),
});

export type AuthUserInput = z.infer<typeof authUserSchema>;