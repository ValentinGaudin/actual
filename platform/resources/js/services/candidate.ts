import instance from './instance';

import { CandidateSchema } from '@/types/Candidate';

const getCandidates = async () => {
	const response = await instance.get(`/candidates`);

	const data = await response.json();

	const candidatesResponse = CandidateSchema.array().safeParse(data);

	if (candidatesResponse.success) {
		return Promise.resolve(candidatesResponse.data);
	}
	return Promise.reject({ data: 'Invalid data' });
};

export { getCandidates };
