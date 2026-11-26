import z from "zod";

export const dashboardLimitSchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

export type DashboardLimitSchema = z.infer<typeof dashboardLimitSchema>;
