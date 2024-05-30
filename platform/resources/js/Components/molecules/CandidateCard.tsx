import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

import { CandidateEdit, SkeletonCandidateCard } from '@/Components/atoms';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/ui/card';

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
				<Card className="dark:bg-black/40">
					<CardHeader className="flex flex-row justify-between items-center w-full">
						<img
							src="https://picsum.photos/200"
							alt="a lorem piscum image"
							className="rounded-full w-16 h-16 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
						/>
						<CardTitle className="font-bold text-3xl">
							{data.full_name}
						</CardTitle>
						<CardDescription className="flex items-center">
							{new Date(data.birthday).toLocaleDateString().split('T')[0]}
						</CardDescription>
						<CandidateEdit candidate={data} />
					</CardHeader>
					<CardContent>Missions :</CardContent>
				</Card>
			)}
		</div>
	);
};

export default CandidateCard;
