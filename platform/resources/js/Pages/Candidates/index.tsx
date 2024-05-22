import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCandidates } from '@/services/candidate';

const Index = () => {
	const { isLoading, data, isError } = useQuery({
		queryKey: ['candidates'],
		queryFn: () => getCandidates(),
		select: (responseData) => responseData,
	});

	return (
		<div>
			{!isLoading &&
				data &&
				data.map((candidate, key) => (
					<li
						className="flex justify-center px-4 py-4 hover:dark:bg-dark hover:bg-brand hover:text-white hover:dark:text-primary text-sm sm:text-base"
						key={key}
					>
						{candidate.first_name} {candidate.last_name}
					</li>
				))}
		</div>
	);
};

export default Index;
