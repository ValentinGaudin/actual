import z from 'zod';

export const ApiErrorSchema = z
	.object({
		message: z.string(),
		errors: z.record(z.array(z.string())),
	})
	.partial({ errors: true });

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const ApiResponseSchema = z.object({
	message: z.string(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
