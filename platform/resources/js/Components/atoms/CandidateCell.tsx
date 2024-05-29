import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Candidate } from '@/types/Candidate';

type Props = {
	candidateKey: string;
	candidateId: Candidate['id'];
};

const CandidateCell = ({ candidateKey, candidateId }: Props) => {
	const navigate = useNavigate();
	const goCandidateShow = (id: Candidate['id']) => {
		navigate(`/candidates/${id}`);
	};

	return (
		<td
			onClick={() => goCandidateShow(candidateId)}
			className="px-5 py-5 border-b border-gray-500 dark:bg-black/60 bg-white text-sm cursor-pointer"
		>
			<div className="flex items-center">
				<div className="ml-3">
					<p className="dark:text-white/80 text-gray-900 whitespace-no-wrap w-full h-full">
						{candidateKey}
					</p>
				</div>
			</div>
		</td>
	);
};

export default CandidateCell;
