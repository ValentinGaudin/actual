import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import { getCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

import {
	CandidateDelete,
	CandidateEdit,
	SkeletonCandidateCard,
} from '@/Components/atoms';

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

	const locales = {
		'en-US': enUS,
	};
	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	});

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['candidate', candidateId],
		queryFn: () => getCandidate({ id: Number(candidateId) }),
		select: (responseData) => responseData.data,
		enabled: !!candidateId,
	});

	const candidateMission = useMemo(() => {
		return (
			data &&
			data.missions.map((mission) => ({
				title: `${mission.start_date} - ${mission.end_date} ${mission.title}`,
				start: new Date(mission.start_date),
				end: new Date(mission.end_date),
			}))
		);
	}, [data]);

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
						<div className="flex flex-row space-x-2">
							<CandidateEdit candidate={data} />
							<CandidateDelete candidate={data} />
						</div>
					</CardHeader>
					<CardContent>
						<h4 className="text-3xl p-4">Missions :</h4>
						<Calendar
							localizer={localizer}
							defaultDate={new Date()}
							defaultView="month"
							startAccessor="start"
							endAccessor="end"
							events={candidateMission}
							style={{ height: 500 }}
							views={['month', 'week']}
							selectable={false}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default CandidateCard;
