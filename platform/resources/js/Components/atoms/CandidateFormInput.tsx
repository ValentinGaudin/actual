import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { ErrorMessage, Field } from 'formik';
import { FormikErrors, FormikTouched } from 'formik/dist/types';

import { UpdatePayloadCandidate } from '@/types/Candidate';
import { Input } from '@/shadcn/ui/input';

type Props = {
	errors: FormikErrors<UpdatePayloadCandidate>;
	id: HTMLAttributes<string>['id'];
	title: string;
	touched: FormikTouched<UpdatePayloadCandidate>;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
	defaultValue: string;
};

const CandidateFormInput = ({
	id,
	title,
	type,
	errors,
	touched,
	placeholder,
	defaultValue,
}: Props) => {
	return (
		<div className="flex flex-col md:flex-row items-center md:justify-between justify-center md:w-3/5">
			<div className="md:w-1/3">
				<label
					className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
					htmlFor={id}
				>
					{title}
				</label>
			</div>
			<div className="md:w-2/3">
				{'date' === type ? (
					<Field
						className="dark:bg-black focus:dark:bg-dark-blue appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 dark:border-dark-blue"
						id={id}
						name={id}
						type={type}
						placeholder={placeholder}
					/>
				) : (
					<Field name={id}>
						{() => {
							return (
								<Input
									id={id}
									name={id}
									type={type}
									placeholder={placeholder}
									defaultValue={defaultValue}
								/>
							);
						}}
					</Field>
				)}

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
