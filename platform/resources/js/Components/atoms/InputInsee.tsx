import React, { HTMLAttributes } from 'react';

import { ErrorMessage, Field } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import { FormikErrors, FormikTouched } from 'formik/dist/types';

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/shadcn/ui/inputOTP';

import { UpdatePayloadCandidate } from '@/types/Candidate';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

type Props = {
	errors: FormikErrors<UpdatePayloadCandidate>;
	id: HTMLAttributes<string>['id'];
	title: string;
	touched: FormikTouched<UpdatePayloadCandidate>;
	placeholder?: string;
	defaultValue: string;
};

const InputInsee = ({
	id,
	title,
	errors,
	touched,
	placeholder,
	defaultValue,
}: Props) => {
	return (
		<div className="flex flex-col items-center md:justify-between justify-center">
			<div>
				<label
					className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 py-2"
					htmlFor={id}
				>
					{title}
				</label>
			</div>
			<div className="">
				<Field name={id}>
					{(props: FieldProps) => {
						return (
							<InputOTP
								id={id}
								name={id}
								placeholder={placeholder}
								defaultValue={defaultValue}
								maxLength={15}
								inputMode={'numeric'}
								onChange={(newValue) => {
									void props.form.setFieldValue(props.field.name, newValue);
								}}
								disabled={false}
								pattern={REGEXP_ONLY_DIGITS}
							>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
									<InputOTPSlot index={6} />
									<InputOTPSlot index={7} />
									<InputOTPSlot index={8} />
									<InputOTPSlot index={9} />
									<InputOTPSlot index={10} />
									<InputOTPSlot index={11} />
									<InputOTPSlot index={12} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={13} />
									<InputOTPSlot index={14} />
								</InputOTPGroup>
							</InputOTP>
						);
					}}
				</Field>

				{errors.nir && touched.nir ? (
					<ErrorMessage
						name="nir"
						render={(msg) => (
							<span className="text-red-500 dark:text-red-700">
								{msg} <br />{' '}
							</span>
						)}
					/>
				) : null}
			</div>
		</div>
	);
};

export default InputInsee;
