import z from 'zod';

import instance from './instance';

import {
	CandidateSchema,
	PayloadCandidate,
	UpdatePayloadCandidate,
} from '@/types/Candidate';

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

const updateCandidate = async (payload: UpdatePayloadCandidate) => {
	const kyResponse = await instance.put(`candidates/${payload.id}`, {
		json: payload,
	});

	const data = await kyResponse.json();

	const updateCandidateResponse = ApiResponseSchema.safeParse(data);

	if (updateCandidateResponse.success) {
		return Promise.resolve(updateCandidateResponse.data);
	}

	return Promise.reject({ message: 'Invalid data' });
};

export { getCandidates, getCandidate, deleteCandidate, updateCandidate };
