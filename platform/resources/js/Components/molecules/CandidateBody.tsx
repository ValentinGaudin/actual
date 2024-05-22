import React from 'react';
import { CandidatCell } from '@/Components/atoms';
import { Candidate } from '@/types/Candidate.ts';

type Props = {
	candidates: Candidate[];
};
const CandidateBody = ({ candidates }: Props) => {
	return (
		<tbody>
			{candidates.map((candidate, key) => (
				<tr>
					<CandidatCell key={key} candidateKey={candidate.full_name} />
					<CandidatCell key={key} candidateKey={candidate.full_name} />
					<CandidatCell key={key} candidateKey={candidate.birthday} />
					<CandidatCell key={key} candidateKey={candidate.created_at} />
				</tr>
			))}
		</tbody>
	);
};

export default CandidateBody;
