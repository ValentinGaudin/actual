import z from 'zod';
export const CandidateSchema = z.object({
	last_name: z.string(),
	first_name: z.string(),
	email: z.string(),
	birthdate: z.date(),
	updated_at: z.date(),
	created_at: z.date(),
});

export type Candidate = z.infer<typeof CandidateSchema>;
