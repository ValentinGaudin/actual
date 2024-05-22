import z from 'zod';
export const CandidateSchema = z.object({
	last_name: z.string(),
	first_name: z.string(),
    full_name: z.string(),
	email: z.string(),
    birthday: z.string(),
	updated_at: z.string(),
	created_at: z.string(),
});

export type Candidate = z.infer<typeof CandidateSchema>;
