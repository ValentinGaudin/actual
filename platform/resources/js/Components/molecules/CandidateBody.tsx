import React from 'react';
import { CandidatCell, CandidateDeleteButton } from '@/Components/atoms';
import { Candidate } from '@/types/Candidate';

type Props = {
	candidates: Candidate[];
};
const CandidateBody = ({ candidates }: Props) => {
	return (
		<tbody>
			{candidates.map((candidate, key) => (
				<tr key={key}>
					<CandidatCell candidateKey={candidate.full_name} />
					<CandidatCell candidateKey={candidate.full_name} />
					<CandidatCell candidateKey={candidate.birthday} />
					<CandidatCell candidateKey={candidate.created_at} />
					<CandidateDeleteButton candidate={candidate} />
				</tr>
			))}
		</tbody>
	);
};

export default CandidateBody;
