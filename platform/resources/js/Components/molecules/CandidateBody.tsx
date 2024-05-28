import React from 'react';
import { CandidateCell } from '@/Components/atoms';
import { CandidateButtons } from '@/Components/molecules';

import { Candidate } from '@/types/Candidate';

type Props = {
	candidate: Candidate;
};

const CandidateBody = ({ candidate }: Props) => {
	return (
		<tbody>
			<tr>
				<CandidateCell
					candidateKey={candidate.full_name}
					candidateId={candidate.id}
				/>
				<CandidateCell
					candidateKey={candidate.email}
					candidateId={candidate.id}
				/>
				<CandidateCell
					candidateKey={candidate.birthday}
					candidateId={candidate.id}
				/>
				<CandidateCell
					candidateKey={candidate.created_at}
					candidateId={candidate.id}
				/>
				<CandidateButtons candidate={candidate} />
			</tr>
		</tbody>
	);
};

export default CandidateBody;
