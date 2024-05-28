import React from 'react';
import { useParams } from 'react-router';
import { toFormikValidationSchema } from 'zod-formik-adapter';
// eslint-disable-next-line import/named
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

import {
	CandidateUpdatePayloadSchema,
	UpdatePayloadCandidate,
} from '@/types/Candidate';
import { ApiError } from '@/types/Api';

import { updateCandidate } from '@/services/http/candidate';

import { useToasterStore } from '@/hooks';

type Params = {
	candidateId: string;
};

const CandidateForm = () => {
	const { candidateId } = useParams<keyof Params>() as Params;
	const showToast = useToasterStore((state) => state.showToast);

	const initialValue = {
		id: candidateId,
		first_name: '',
		last_name: '',
		email: '',
		birthday: '',
		missions: [],
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
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
				const data: ApiError = await err?.response.json();

				formikHelpers.setErrors({ ...data.errors });
			}
		}
	};

	return (
		<Formik
			initialValues={initialValue}
			onSubmit={handleSubmit}
			validationSchema={toFormikValidationSchema(CandidateUpdatePayloadSchema)}
		>
			{({ errors, touched }) => (
				<Form>
					<label htmlFor="first_name">First Name</label>
					<Field onB id="first_name" name="first_name" placeholder="John" />
					{errors.first_name && touched.first_name ? (
						<ErrorMessage name="first_name" />
					) : null}

					<label htmlFor="last_name">Last Name</label>
					<Field id="last_name" name="last_name" placeholder="Doe" />
					{errors.last_name && touched.last_name ? (
						<ErrorMessage name="last_name" />
					) : null}

					<label htmlFor="email">Email</label>
					<Field
						id="email"
						name="email"
						placeholder="john@acme.com"
						type="email"
					/>
					{errors.email && touched.email ? <ErrorMessage name="email" /> : null}

					<label htmlFor="birthday">Last Name</label>
					<Field id="birthday" name="birthday" type="date" />
					{errors.birthday && touched.birthday ? (
						<ErrorMessage name="birthday" />
					) : null}

					<label htmlFor="missions">Last Name</label>
					<Field
						className="custom-select"
						name="missions"
						options={languageOptions}
						component={CustomSelect}
						placeholder="Select multi languages..."
						isMulti={true}
					/>
					{errors.birthday && touched.birthday ? (
						<ErrorMessage name="birthday" />
					) : null}


					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
};

export default CandidateForm;
