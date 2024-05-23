import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
	candidateKey: string;
};

const CandidateCell = ({ candidateKey }: Props) => {
	return (
		<td className="px-5 py-5 border-b border-gray-200 dark:bg-gray-700/80 bg-white text-sm">
			<NavLink to={`candidate/1`} className="block w-full h-full">
				<div className="flex items-center">
					<div className="ml-3">
						<p className="dark:text-white/80 text-gray-900 whitespace-no-wrap w-full h-full">
							{candidateKey}
						</p>
					</div>
				</div>
			</NavLink>
		</td>
	);
};

export default CandidateCell;
