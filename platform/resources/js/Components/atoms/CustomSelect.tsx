import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';

import { Candidate } from '@/types/Candidate';
import { Option } from '@/types/Option';
import { Mission } from '@/types/Mission';

import { getMissions } from '@/services/http/mission';
import { FieldProps } from 'formik/dist/Field';

type Props = {
	field: FieldProps['field'];
	form: FieldProps['form'];
	candidate: Candidate;
};

const MultiSelect = ({ candidate, field, form }: Props) => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

	const { isLoading, data, isError } = useQuery({
		queryKey: ['missions'],
		queryFn: () => getMissions(),
		select: (responseData) => responseData.data,
	});

	const areDatesOverlapping = (
		start1: Date,
		end1: Date,
		start2: Date,
		end2: Date
	): boolean => {
		return !(end1 < start2 || end2 < start1);
	};

	const getAvailableMissions = (
		allMissions: Mission[],
		selectMissions: Mission[]
	): Mission[] => {
		return allMissions.filter((mission) => {
			return !selectMissions.some((selectMission) =>
				areDatesOverlapping(
					new Date(mission.start_date),
					new Date(mission.end_date),
					new Date(selectMission.start_date),
					new Date(selectMission.end_date)
				)
			);
		});
	};

	const availableMissionsOptions = useMemo(() => {
		if (!data || !candidate) return [];

		if (selectedOptions.length === 0) {
			return data
				.map((mission) => ({
					value: mission.id,
					label: `${mission.start_date} - ${mission.end_date} ${mission.title}`,
				}))
				.sort((a, b) => a.value - b.value);
		}

		const currentSelectedMissionIds = selectedOptions.map(
			(option) => option.value
		);

		const currentSelectedMissions = data.filter((mission) => {
			return currentSelectedMissionIds.includes(mission.id);
		});
		return getAvailableMissions(data, currentSelectedMissions)
			.map((mission) => ({
				value: mission.id,
				label: `${mission.start_date} - ${mission.end_date} ${mission.title}`,
			}))
			.sort((a, b) => a.value - b.value);
	}, [data, candidate, selectedOptions]);

	const defaultMissionValue = useMemo(() => {
		if (!data || !candidate) return [];

		const candidateMissionIds = new Set(
			candidate.missions.map((mission) => mission.id)
		);

		const defaultMission = data
			.filter((mission) => candidateMissionIds.has(mission.id))
			.map((mission) => ({
				value: mission.id,
				label: `${mission.start_date} - ${mission.end_date} ${mission.title}`,
			}));

		setSelectedOptions(defaultMission);

		return defaultMission;
	}, [data, candidate]);

	const onChange = (option: readonly Option[]) => {
		setSelectedOptions(() => {
			return option.filter(
				(newOption, index, self) =>
					index === self.findIndex((o) => o.value === newOption.value)
			);
		});
		void form.setFieldValue(field.name, option);
	};

	return (
		!isLoading &&
		!isError && (
			<Select
				name="missions"
				className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-700 leading-tight"
				closeMenuOnSelect={false}
				options={availableMissionsOptions}
				defaultValue={defaultMissionValue}
				isMulti
				onChange={onChange}
				classNamePrefix="react-select"
				theme={(theme) => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary: 'black',
					},
				})}
			/>
		)
	);
};

export default MultiSelect;
