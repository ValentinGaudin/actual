import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { CandidateHead, SkeletonCandidateBody } from '@/Components/atoms';
import { CandidateBody } from '@/Components/molecules';

import { getCandidates } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

const Candidates = () => {
	const showToast = useToasterStore((state) => state.showToast);

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['candidates'],
		queryFn: () => getCandidates(),
		select: (responseData) => responseData.data,
	});

	useEffect(() => {
		if (isError) {
			showToast({
				type: 'error',
				message: error.message ?? 'Something goes wrong',
			});
		}
	}, [isError]);

	return (
		<>
			<div className="overflow-x-auto w-full mt-4">
				<div className="inline-block min-w-full border border-gray-200 rounded-lg shadow overflow-y-scroll w-full">
					<table className="min-w-full leading-normal ">
						<CandidateHead />
						{data &&
							data.map((candidate, key) => (
								<CandidateBody candidate={candidate} key={key} />
							))}
						{isLoading && <SkeletonCandidateBody />}
					</table>
				</div>
			</div>
		</>
	);
};

export default Candidates;
