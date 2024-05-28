import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

import { SkeletonCandidateCard } from '@/Components/atoms';

type Params = {
	candidateId: string;
};

const CandidateCard = () => {
	const { candidateId } = useParams<Params>();
	const navigate = useNavigate();
	const showToast = useToasterStore((state) => state.showToast);

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['candidate', candidateId],
		queryFn: () => getCandidate({ id: Number(candidateId) }),
		select: (responseData) => responseData.data,
		enabled: !!candidateId,
	});

	useEffect(() => {
		if (!candidateId) {
			navigate('/404');
		}
	}, [candidateId]);

	useEffect(() => {
		if (isError && error) {
			showToast({
				type: 'error',
				message: error.message ?? 'Something went wrong',
			});
		}
	}, [isError, error]);

	return (
		<div className="w-full h-full mt-16">
			{isLoading && isError && <SkeletonCandidateCard />}
			{data && (
				<div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
					<div className="flex flex-row justify-around items-center p-5 ">
						<div className="flex justify-center">
							<img
								src="https://avatars0.githubusercontent.com/u/35900628?v=4"
								alt=""
								className="rounded-full mx-auto -top-20 w-16 h-16 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
							/>
						</div>
						<h1 className="font-bold text-center text-3xl text-gray-900">
							{data.full_name}
						</h1>
						<p className="text-center text-sm text-gray-400 font-medium">
							{data.birthday}
						</p>
					</div>

					<div className="w-full mt-4">
						<h3 className="font-medium text-gray-900 text-left px-6">
							Missions :
						</h3>
						<div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm"></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CandidateCard;
