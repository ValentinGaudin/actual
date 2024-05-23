import { Link, useRouteError } from 'react-router-dom';

import React, { useMemo } from 'react';
import { isRouteErrorResponse } from 'react-router';

const ErrorPage = () => {
	const error = useRouteError();

	const errorMessage = useMemo(() => {
		if (isRouteErrorResponse(error)) {
			return { message: error.statusText, code: error.status };
		} else if (error instanceof Error) {
			return { message: error.message, code: 'Unknow' };
		} else if (typeof error === 'string') {
			return { message: error, code: 'Unknow' };
		}
		return { message: 'Unknown error', code: 'Unknow' };
	}, [error]);

	return (
		<div
			id="error-page"
			className="flex flex-col gap-8 justify-center items-center h-screen"
		>
			<h1 className="text-4xl font-bold text-dark-blue dark:text-white/90">
				Oops!
			</h1>
			<p className="text-dark-blue dark:text-white/90">
				Sorry, an unexpected error has occurred.
			</p>
			<p className="text-dark-blue dark:text-salte-400/90 space-x-2">
				<i className="text-dark-blue dark:text-white/90">{errorMessage.code}</i>
				<i className="text-dark-blue dark:text-white/90">
					{errorMessage.message}
				</i>
			</p>
			<Link to="/" className="text-dark-blue dark:text-white/90">
				BACK Home
			</Link>
		</div>
	);
};

export default ErrorPage;
