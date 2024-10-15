import { z } from 'zod';

export const recruitmentSchema = z.object({
  name: z.string().trim().min(2).max(50).trim(),
  registrationNumber: z.string().trim().startsWith('RA').min(15).max(15).trim(),
  collegeMail: z.string().email().endsWith('srmist.edu.in').trim(),
  personalMail: z.string().email().trim(),
  phoneNumber: z.string().trim(),
  classSection: z.string().toUpperCase().trim(),
  year: z.number().int().min(1).max(4),
  semester: z.number().int().min(1).max(8),
  gender: z.string().trim(),
  domain: z.string().trim(),
  department: z.string().trim(),
  branch: z.string().trim(),
  resume: z.string().url().trim(),
});

export const centralRecruitmentSchema = recruitmentSchema.extend({
  registeredAt: z.string().default(() => new Date().toISOString()),
});

export type recruitmentSchemaType = z.infer<typeof recruitmentSchema>;
export type centralRecruitmentSchemaType = z.infer<
  typeof centralRecruitmentSchema
>;
