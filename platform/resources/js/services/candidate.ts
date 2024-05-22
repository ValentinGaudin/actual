import z from 'zod';

import instance from './instance';

import { CandidateSchema, PayloadDeleteCandidate } from '@/types/Candidate';
import { ApiResponseSchema } from '@/types/Api';

const getCandidates = async () => {
	const response = await instance.get(`candidates`);

	const data = await response.json();

	const candidatesResponse = z
		.object({ data: CandidateSchema.array() })
		.safeParse(data);

	if (candidatesResponse.success) {
		return Promise.resolve(candidatesResponse.data);
	}
	return Promise.reject({ data: 'Invalid data' });
};

const deleteCandidate = async (candidate: PayloadDeleteCandidate) => {
	const response = await instance.delete(`candidates/${candidate.id.toString()}`);

    const data = await response.json();

    console.log(data);
    const deleteCandidateResponse = ApiResponseSchema.safeParse(data);

	console.log(deleteCandidateResponse);

	if (deleteCandidateResponse.success) {
		return Promise.resolve(deleteCandidateResponse.data);
	}
	return Promise.reject({ message: 'Invalid data' });
};

export { getCandidates, deleteCandidate };
