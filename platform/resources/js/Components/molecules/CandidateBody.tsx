import React, { useMemo } from 'react';
import { CandidateCell, CandidateDeleteButton } from '@/Components/atoms';
import { Candidate } from '@/types/Candidate';

type Props = {
	candidate: Candidate;
};

const CandidateBody = ({ candidate }: Props) => {
	const counterMission = useMemo(() => {
		return candidate.missions.length || 0;
	}, [candidate]);

	return (
		<tbody>
			<tr>
				<CandidateCell
					candidateKey={candidate.full_name}
					candidateId={candidate.id}
				/>
				<CandidateCell
					candidateKey={counterMission.toString()}
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
				<CandidateDeleteButton candidate={candidate} />
			</tr>
		</tbody>
	);
};

export default CandidateBody;
