import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@/Pages/Home';
import { BaseTemplate } from '@/Components/templates';

const App = () => {
	return (
		<BaseTemplate />
	);
};

const Wrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
};

export default Wrapper;
