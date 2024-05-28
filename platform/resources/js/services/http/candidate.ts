import z, { unknown } from 'zod';

import instance from './instance';

import {
	CandidateSchema,
	PayloadCandidate,
	UpdatePayloadCandidate,
} from '@/types/Candidate';
import { ApiErrorSchema, ApiResponseSchema } from '@/types/Api';
import { KyResponse } from 'ky';

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

const getCandidate = async (candidate: PayloadCandidate) => {
	const response = await instance.get(`candidates/${candidate.id.toString()}`);

	const data = await response.json();

	const candidateResponse = z.object({ data: CandidateSchema }).safeParse(data);

	if (candidateResponse.success) {
		return Promise.resolve(candidateResponse.data);
	}
	return Promise.reject({ data: 'Invalid data' });
};

const deleteCandidate = async (candidate: PayloadCandidate) => {
	const response = await instance.delete(
		`candidates/${candidate.id.toString()}`
	);

	const data = await response.json();

	const deleteCandidateResponse = ApiResponseSchema.safeParse(data);

	if (deleteCandidateResponse.success) {
		return Promise.resolve(deleteCandidateResponse.data);
	}
	return Promise.reject({ message: 'Invalid data' });
};

const updateCandidate = async (candidate: UpdatePayloadCandidate) => {
	const response = await instance.put(`candidates/${candidate.id}`);

	return response.json();
};

export { getCandidates, getCandidate, deleteCandidate, updateCandidate };
