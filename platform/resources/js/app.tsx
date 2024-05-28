import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

import { ErrorPage } from '@/Components/atoms';
import { CandidateCard, CandidateForm } from '@/Components/molecules';
import { Toaster } from '@/Components/organisms';
import { BaseTemplate } from '@/Components/templates';
import { Candidates } from '@/Pages';

import { useThemeStore } from '@/hooks';

const App = () => {
	const { theme } = useThemeStore();

	const router = createBrowserRouter([
		{
			path: '/',
			element: <BaseTemplate />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <Candidates />,
				},
				{
					path: 'candidates/:candidateId',
					element: <CandidateCard />,
				},
				{
					path: 'candidates/:candidateId/edit',
					element: <CandidateForm />,
				},
			],
		},
	]);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	return <RouterProvider router={router} />;
};

const Wrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster>
				<App />
			</Toaster>
		</QueryClientProvider>
	);
};

export default Wrapper;
