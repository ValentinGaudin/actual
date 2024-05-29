import React from 'react';
import { CandidateDelete, CandidateEdit } from '@/Components/atoms';

import { Candidate } from '@/types/Candidate';

type Props = {
	candidate: Candidate;
};

const CandidateButtons = ({ candidate }: Props) => {
	return (
		<td className="px-5 py-5 border-b border-gray-500 dark:bg-black/80 bg-white text-sm">
			<div className="flex flex-row">
				<CandidateEdit candidate={candidate} />
				<CandidateDelete candidate={candidate} />
			</div>
		</td>
	);
};

export default CandidateButtons;
