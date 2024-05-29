import z from 'zod';

import { MissionSchema } from '@/types/Mission';
import { OptionSchema } from '@/types/Option';

export const CandidateSchema = z.object({
	id: z.number(),
	last_name: z.string(),
	first_name: z.string(),
	full_name: z.string(),
	email: z.string(),
	birthday: z.string(),
	missions: MissionSchema.array(),
	updated_at: z.string(),
	created_at: z.string(),
});

export type Candidate = z.infer<typeof CandidateSchema>;

export const PayloadCandidateSchema = z.object({ id: z.number() });

export type PayloadCandidate = z.infer<typeof PayloadCandidateSchema>;

export const CandidateUpdatePayloadSchema = z.object({
	id: z.string(),
	last_name: z
		.string()
		.min(3, 'lastname is too short')
		.max(20, 'Username is too long'),
	first_name: z
		.string()
		.min(3, 'firstname is too short')
		.max(20, 'Username is too long'),
	email: z.string().email('Invalid email address').min(5, 'Email is too short'),
	birthday: z.string(),
	missions: OptionSchema.array(),
});

export type UpdatePayloadCandidate = z.infer<
	typeof CandidateUpdatePayloadSchema
>;
