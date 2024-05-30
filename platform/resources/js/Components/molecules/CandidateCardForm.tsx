import React, { Suspense, useMemo } from 'react';
import { HTTPError } from 'ky';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { FieldProps } from 'formik/dist/Field';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button } from '@/shadcn/ui/button';

import {
	CandidateUpdatePayloadSchema,
	UpdatePayloadCandidate,
} from '@/types/Candidate';
import { MissionSchema } from '@/types/Mission';
import { ApiError } from '@/types/Api';

import { getCandidate, updateCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

import {
	CandidateFormInput,
	CustomSelect,
	InputInsee,
} from '@/Components/atoms';

type Params = {
	candidateId: string;
};

function Loading() {
	return <h2>Chargement...</h2>;
}

const CandidateCardForm = () => {
	const { candidateId } = useParams<keyof Params>() as Params;
	const showToast = useToasterStore((state) => state.showToast);
	const queryClient = useQueryClient();

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
		nir: data?.nir ?? '',
		options: initialOptions ?? [],
	};

	const navigate = useNavigate();

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

			await queryClient.invalidateQueries({ queryKey: ['candidate'] });
			navigate(`/candidates/${candidateId}`);
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
							<Form className="flex flex-col items-center space-y-6 dark:bg-gray-900/40 bg-zinc-50 rounded-xl backdrop-blur drop-shadow px-2 py-5">
								<CandidateFormInput
									id="first_name"
									placeholder="John"
									type="text"
									title="Prénom"
									touched={touched}
									errors={errors}
									defaultValue={initialValue.first_name}
								/>

								<CandidateFormInput
									id="last_name"
									placeholder="Doe"
									type="text"
									title="Nom"
									touched={touched}
									errors={errors}
									defaultValue={initialValue.last_name}
								/>

								<CandidateFormInput
									id="email"
									placeholder="johndoe@gmail.com"
									type="email"
									title="Email"
									touched={touched}
									errors={errors}
									defaultValue={initialValue.email}
								/>

								<CandidateFormInput
									id="birthday"
									type="date"
									title="Date de naissance"
									touched={touched}
									errors={errors}
									defaultValue={initialValue.birthday}
								/>

								<InputInsee
									errors={errors}
									id={'nir'}
									title={'Numéro de sécurité social'}
									touched={touched}
									defaultValue={initialValue.nir}
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
								<Button type="submit">Enregistrer</Button>
							</Form>
						)}
					</Formik>
				</Suspense>
			</>
		)
	);
};

export default CandidateCardForm;
