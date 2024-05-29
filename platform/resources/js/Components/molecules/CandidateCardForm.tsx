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
import { HTTPError } from 'ky';

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
			if (err instanceof HTTPError && err.response?.status === 422) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const dataError: ApiError = await err.response.json();
				formikHelpers.setErrors({ ...dataError.errors });
			} else {
				return;
			}
		}
	};
	return (
		!isLoading &&
		!isError &&
		data && (
			<>
				<div className="py-4">
					<span className="dark:text-white text-dark-blue">
						Modification candidat : <strong>{data.full_name}</strong>
					</span>
				</div>
				<Suspense fallback={<Loading />}>
					<Formik
						initialValues={initialValue}
						onSubmit={handleSubmit}
						validationSchema={toFormikValidationSchema(
							CandidateUpdatePayloadSchema
						)}
					>
						{({ errors, touched }) => (
							<Form className="flex flex-col items-center space-y-6 w-3/4 dark:bg-gray-800/90 rounded-lg px-2 py-5">
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

								<div className="flex flex-col md:flex-row items-center md:justify-between justify-center md:w-3/5">
									<div className="md:w-1/3">
										<label
											className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
											htmlFor="missions"
										>
											Missions
										</label>
									</div>
									{data && (
										<div className="md:w-2/3">
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
										</div>
									)}
									{errors.options && touched.options ? (
										<ErrorMessage
											name="options"
											className="text-red-500 dark:text-red-700"
										/>
									) : null}
								</div>

								<button className="flex mx-auto w-2/3 md:w-3/5 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
									Enregistrer
								</button>
							</Form>
						)}
					</Formik>
				</Suspense>
				) );
			</>
		)
	);
};

export default CandidateCardForm;
