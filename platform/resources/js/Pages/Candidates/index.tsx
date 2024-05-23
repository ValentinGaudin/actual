import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCandidates } from '@/services/candidate';
import { CandidateHead, SkeletonCandidateBody } from '@/Components/atoms';
import { CandidateBody } from '@/Components/molecules';
import { useToasterStore } from '@/hooks';

const Index = () => {
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
		<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto w-ful">
			<div className="inline-block min-w-full shadow rounded-lg overflow-y-scroll w-full">
				<table className="min-w-full leading-normal">
					<CandidateHead />
					{data && <CandidateBody candidates={data} />}
					{isLoading && <SkeletonCandidateBody />}
				</table>
			</div>
		</div>
	);
};

export default Index;