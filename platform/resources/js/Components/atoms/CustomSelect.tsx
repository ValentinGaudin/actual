import React, { useEffect, useMemo } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';

import { Candidate } from '@/types/Candidate';
import { Option } from '@/types/Option';

import { getMissions } from '@/services/http/mission';
import { FieldProps } from 'formik/dist/Field';

type Props = {
	field: FieldProps['field'];
	form: FieldProps['form'];
	candidate: Candidate;
};

const MultiSelect = ({ candidate, field, form }: Props) => {
	const { isLoading, data, isError } = useQuery({
		queryKey: ['missions'],
		queryFn: () => getMissions(),
		select: (responseData) => responseData.data,
	});

	const missions = useMemo(() => {
		return (
			data &&
			data
				.map((mission) => ({
					value: mission.id,
					label: mission.title,
				}))
				.sort((a, b) => a.value - b.value)
		);
	}, [data]);

	const defaultMissionValue = useMemo(() => {
		if (!data || !candidate) return [];

		const candidateMissionIds = new Set(
			candidate.missions.map((mission) => mission.id)
		);

		return data
			.filter((mission) => candidateMissionIds.has(mission.id))
			.map((mission) => ({
				value: mission.id,
				label: mission.title,
			}));
	}, [data, candidate]);

	const onChange = (option: readonly Option[]) => {
		void form.setFieldValue(field.name, option);
	};

	return (
		!isLoading &&
		!isError && (
			<Select
				name="missions"
				className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
				closeMenuOnSelect={false}
				options={missions}
				defaultValue={defaultMissionValue}
				isMulti
				onChange={onChange}
			/>
		)
	);
};

export default MultiSelect;
