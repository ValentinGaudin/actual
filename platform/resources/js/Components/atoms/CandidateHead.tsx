import React from 'react';

const CandidateHead = () => {
	return (
		<thead>
			<tr>
				<th className="px-5 py-3 border-b-2 border-gray-200 dark:bg-gray-800/90 bg-gray-100 text-left text-xs font-semibold dark:text-white/90 text-gray-600 uppercase tracking-wider">
					Name
				</th>
				<th className="px-5 py-3 border-b-2 border-gray-200 dark:bg-gray-800/90 bg-gray-100 text-left text-xs font-semibold dark:text-white/90 text-gray-600 uppercase tracking-wider">
					Missions
				</th>
				<th className="px-5 py-3 border-b-2 border-gray-200 dark:bg-gray-800/90 bg-gray-100 text-left text-xs font-semibold dark:text-white/90 text-gray-600 uppercase tracking-wider">
					Date de Naissance
				</th>
				<th className="px-5 py-3 border-b-2 border-gray-200 dark:bg-gray-800/90 bg-gray-100 text-left text-xs font-semibold dark:text-white/90 text-gray-600 uppercase tracking-wider">
					Créée le
				</th>
			</tr>
		</thead>
	);
};

export default CandidateHead;
