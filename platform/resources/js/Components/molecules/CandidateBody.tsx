import React from 'react';
import { CandidateCell, CandidateDeleteButton } from '@/Components/atoms';
import { Candidate } from '@/types/Candidate';
import { NavLink } from 'react-router-dom';

type Props = {
	candidates: Candidate[];
};
const CandidateBody = ({ candidates }: Props) => {
	return (
		<tbody>
			{candidates.map((candidate, key) => (
				<tr key={key}>
					<CandidateCell candidateKey={candidate.full_name} />
					<CandidateCell candidateKey={candidate.full_name} />
					<CandidateCell candidateKey={candidate.birthday} />
					<CandidateCell candidateKey={candidate.created_at} />
					<CandidateDeleteButton candidate={candidate} />
				</tr>
			))}
		</tbody>
	);
};

export default CandidateBody;
