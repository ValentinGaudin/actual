import React from 'react';

type Props = {
	candidateKey: string;
};

const CandidatCell = ({ candidateKey }: Props) => {
	return (
		<td className="px-5 py-5 border-b border-gray-200 dark:bg-gray-700/80 bg-white text-sm">
			<div className="flex items-center">
				<div className="ml-3">
					<p className="dark:text-white/80 text-gray-900 whitespace-no-wrap">
						{candidateKey}
					</p>
				</div>
			</div>
		</td>
	);
};

export default CandidatCell;
