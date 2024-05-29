import React from 'react';

const SkeletonCandidateCard = () => {
	return (
		<tbody>
			<tr>
				<td className="px-5 py-5 border-b border-gray-200 animate-pulse bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<span className="text-gray-900 whitespace-no-wrap" />
						</div>
					</div>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 animate-pulse bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<span className="text-gray-900 whitespace-no-wrap" />
						</div>
					</div>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 animate-pulse bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<span className="text-gray-900 whitespace-no-wrap" />
						</div>
					</div>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 animate-pulse bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<span className="text-gray-900 whitespace-no-wrap" />
						</div>
					</div>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 animate-pulse bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<span className="text-gray-900 whitespace-no-wrap" />
						</div>
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default SkeletonCandidateCard;
