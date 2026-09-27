import { z } from 'zod';

export const locationSearchSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, 'Search text is required'),
});

export const coordinatesSchema = z.object({
  lat: z.coerce
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),

  lon: z.coerce
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

export type LocationSearchParams = z.infer<typeof locationSearchSchema>;

export type CoordinatesParams = z.infer<typeof coordinatesSchema>;