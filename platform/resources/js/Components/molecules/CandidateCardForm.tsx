import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { FieldProps } from 'formik/dist/Field';
import { useQuery } from '@tanstack/react-query';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
	CandidateUpdatePayloadSchema,
	UpdatePayloadCandidate,
} from '@/types/Candidate';
import { MissionSchema } from '@/types/Mission';
import { ApiError } from '@/types/Api';

import { getCandidate, updateCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

import { CandidateFormInput, CustomSelect } from '@/Components/atoms';

type Params = {
	candidateId: string;
};

function Loading() {
	return <h2>🌀 Chargement...</h2>;
}

const CandidateCardForm = () => {
	const { candidateId } = useParams<keyof Params>() as Params;
	const showToast = useToasterStore((state) => state.showToast);

	const { isLoading, data, isError } = useQuery({
		queryKey: ['candidate', candidateId],
		queryFn: () => getCandidate({ id: Number(candidateId) }),
		select: (responseData) => responseData.data,
		enabled: !!candidateId,
	});

	const initialOptions = useMemo(() => {
		const parsedData = MissionSchema.array().safeParse(data?.missions);

		return parsedData.data?.map((mission) => ({
			value: mission.id,
			label: mission.title,
		}));
	}, [data]);

	const initialValue = {
		id: candidateId,
		first_name: data?.first_name ?? '',
		last_name: data?.last_name ?? '',
		email: data?.email ?? '',
		birthday: data?.birthday ?? '',
		options: initialOptions ?? [],
	};

	const handleSubmit = async (
		values: UpdatePayloadCandidate,
		formikHelpers: FormikHelpers<UpdatePayloadCandidate>
	) => {
		try {
			const response = await updateCandidate(values);
			showToast({
				type: 'success',
				message: response.message ?? 'Successfully Updated',
			});
		} catch (err: unknown) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (422 === err?.response.status) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-shadow
				const data: ApiError = await err?.response.json();

				formikHelpers.setErrors({ ...data.errors });
			}
		}
	};
	return (
		!isLoading &&
		!isError &&
		data && (
			<Suspense fallback={<Loading />}>
				<Formik
					initialValues={initialValue}
					onSubmit={handleSubmit}
					validationSchema={toFormikValidationSchema(
						CandidateUpdatePayloadSchema
					)}
				>
					{({ errors, touched }) => (
						<Form className="w-full max-w-sm">
							<CandidateFormInput
								id="first_name"
								placeholder="John"
								type="text"
								title="Prénom"
								touched={touched}
								errors={errors}
							/>

							<CandidateFormInput
								id="last_name"
								placeholder="Doe"
								type="text"
								title="Nom"
								touched={touched}
								errors={errors}
							/>

							<CandidateFormInput
								id="email"
								placeholder="johndoe@gmail.com"
								type="email"
								title="Email"
								touched={touched}
								errors={errors}
							/>

							<CandidateFormInput
								id="birthday"
								type="date"
								title="Date de naissance"
								touched={touched}
								errors={errors}
							/>

							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="missions"
								>
									Missions
								</label>
							</div>
							{data && (
								<Field name={'options'}>
									{(props: FieldProps) => {
										return (
											<CustomSelect
												candidate={data}
												field={props.field}
												form={props.form}
											/>
										);
									}}
								</Field>
							)}

							{errors.options && touched.options ? (
								<ErrorMessage
									name="options"
									className="text-red-500 dark:text-red-700"
								/>
							) : null}

							<button type="submit">Submit</button>
						</Form>
					)}
				</Formik>
			</Suspense>
		)
	);
};

export default CandidateCardForm;
