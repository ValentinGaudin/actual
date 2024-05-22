import instance from './instance';

import { CandidateSchema } from '@/types/Candidate';
import z from "zod";

const getCandidates = async () => {
	const response = await instance.get(`candidates`);

    const data = await response.json();

    const candidatesResponse = z.object({ data: CandidateSchema.array() }).safeParse(data);

    if (candidatesResponse.success) {
		return Promise.resolve(candidatesResponse.data);
	}
	return Promise.reject({ data: 'Invalid data' });
};

export { getCandidates };
