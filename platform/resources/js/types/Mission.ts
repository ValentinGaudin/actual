import z from 'zod';

export const MissionSchema = z.object({
	id: z.number(),
	title: z.string(),
	start_date: z.string(),
	end_date: z.string(),
	updated_at: z.string(),
	created_at: z.string(),
});

export type Mission = z.infer<typeof MissionSchema>;
