import z from 'zod';

import { MissionSchema } from './Mission';

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
