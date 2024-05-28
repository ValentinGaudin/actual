import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Candidate, PayloadCandidate } from '@/types/Candidate';
import { ApiError, ApiResponse } from '@/types/Api';

import { Bin } from '@/Components/atoms/icons';
import { deleteCandidate } from '@/services/candidate';
import { useToasterStore } from '@/hooks';

type Props = {
	candidate: Candidate;
};

const CandidateDelete = ({ candidate }: Props) => {
	const showToast = useToasterStore((state) => state.showToast);

	const queryClient = useQueryClient();

	const candidateMutation = useMutation<
		ApiResponse,
		ApiError,
		PayloadCandidate
	>({
		mutationFn: (payload) => deleteCandidate(payload),
		onError: (error) => {
			showToast({
				type: 'error',
				message: error ? error.message : 'Something goes wrong',
			});
		},
		onSuccess: async () => {
			showToast({
				type: 'success',
				message: candidateMutation.data
					? candidateMutation.data.message
					: 'Successfully deleted candidate',
			});
			await queryClient.invalidateQueries({ queryKey: ['candidates'] });
		},
	});

	return (
		<td className="px-5 py-5 border-b border-gray-200 dark:bg-gray-700/80 bg-white text-sm">
			<div className="flex items-center">
				<div className="ml-3">
					<button
						onClick={() => candidateMutation.mutate({ id: candidate.id })}
						className="flex-no-shrink bg-red-500/80 hover:bg-red-500 p-1 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500/80 hover:border-red-500 text-white rounded-lg"
					>
						<Bin />
					</button>
				</div>
			</div>
		</td>
	);
};

export default CandidateDelete;
