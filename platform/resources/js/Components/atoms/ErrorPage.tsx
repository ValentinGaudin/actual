import { Link, useRouteError } from 'react-router-dom';

import React, { useMemo } from 'react';
import { isRouteErrorResponse } from 'react-router';

const ErrorPage = () => {
	const error = useRouteError();

	const errorMessage = useMemo(() => {
		if (isRouteErrorResponse(error)) {
			return error.statusText;
		} else if (error instanceof Error) {
			return error.message;
		} else if (typeof error === 'string') {
			return error;
		}
		return 'Unknown error';
	}, [error]);

	return (
		<div
			id="error-page"
			className="flex flex-col gap-8 justify-center items-center h-screen"
		>
			<h1 className="text-4xl font-bold">Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p className="text-slate-400">
				<i>{errorMessage}</i>
			</p>
			<Link to="/">BACK Home</Link>
		</div>
	);
};

export default ErrorPage;
