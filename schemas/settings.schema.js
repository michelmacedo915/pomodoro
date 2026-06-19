import { z } from 'zod';

// Validates the (optional) settings form: durations + theme + ambient.
export const settingsSchema = z.object({
  sessionDuration: z.number().int().min(60).max(7200),   // 1–120 min
  breakDuration: z.number().int().min(60).max(3600),
  theme: z.enum(['midnight', 'energy', 'sunset', 'break']),
  ambientTrack: z.enum(['rain', 'lofi', 'wind']).nullable(),
});
