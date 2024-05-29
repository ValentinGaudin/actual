import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Candidate } from '@/types/Candidate';
import { Edit } from '@/Components/atoms/icons';

type Props = {
	candidate: Candidate;
};

const CandidateEdit = ({ candidate }: Props) => {
	const navigate = useNavigate();

	const goCandidateShow = (id: Candidate['id']) => {
		navigate(`/candidates/${id}/edit`);
	};

	return (
		<div className="flex items-center z-50">
			<div className="ml-3">
				<button
					onClick={() => goCandidateShow(candidate.id)}
					className="flex-no-shrink bg-orange-500/80 hover:bg-orange-500 p-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-orange-500/80 hover:border-orange-500 text-white rounded-lg"
				>
					<Edit />
				</button>
			</div>
		</div>
	);
};

export default CandidateEdit;
