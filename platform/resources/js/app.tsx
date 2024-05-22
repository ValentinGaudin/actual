import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Route, Routes} from "react-router-dom";

import Home from '@/Pages/Home';
import Index from "@/Pages/Candidates";
import { BaseTemplate } from '@/Components/templates';
import { Toaster } from '@/Components/organisms';

import { useThemeStore } from '@/hooks';

const App = () => {
    const { theme } = useThemeStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

	return (
		<BaseTemplate>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/candidates" Component={Index} />
            </Routes>
        </BaseTemplate>
	);
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
