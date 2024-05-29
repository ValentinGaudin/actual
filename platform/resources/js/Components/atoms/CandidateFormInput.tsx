import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { ErrorMessage, Field } from 'formik';

import { FormikErrors, FormikTouched } from 'formik/dist/types';

import { UpdatePayloadCandidate } from '@/types/Candidate';

type Props = {
	errors: FormikErrors<UpdatePayloadCandidate>;
	id: HTMLAttributes<string>['id'];
	title: string;
	touched: FormikTouched<UpdatePayloadCandidate>;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
};

const CandidateFormInput = ({
	id,
	title,
	type,
	errors,
	touched,
	placeholder,
}: Props) => {
	return (
		<div className="md:flex md:items-center mb-6">
			<div className="md:w-1/3">
				<label
					className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
					htmlFor={id}
				>
					{title}
				</label>
			</div>
			<div className="md:w-2/3">
				<Field
					className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id={id}
					name={id}
					type={type}
					placeholder={placeholder}
				/>

				{errors.first_name && touched.first_name ? (
					<ErrorMessage
						name="first_name"
						render={(msg) => (
							<span className="text-red-500 dark:text-red-700">{msg}</span>
						)}
					/>
				) : null}
			</div>
		</div>
	);
};

export default CandidateFormInput;
