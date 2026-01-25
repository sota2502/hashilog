import { z } from 'zod';

export const createRunSchema = z.object({
  date: z.string().datetime(),
  distance: z.number().positive('距離は正の数である必要があります'),
  duration: z.number().int().positive('時間は正の整数である必要があります').optional(),
  memo: z.string().optional(),
});

export const updateRunSchema = z.object({
  date: z.string().datetime().optional(),
  distance: z.number().positive('距離は正の数である必要があります').optional(),
  duration: z.number().int().positive('時間は正の整数である必要があります').optional().nullable(),
  memo: z.string().optional().nullable(),
});

export type CreateRunInput = z.infer<typeof createRunSchema>;
export type UpdateRunInput = z.infer<typeof updateRunSchema>;
