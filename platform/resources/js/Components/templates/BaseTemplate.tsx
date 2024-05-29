import React from 'react';
import { Outlet } from 'react-router';

import { Nav, Header } from '@/Components/atoms';

const BaseTemplate = () => {
	return (
		<>
			<Header />
			<div className="flex h-[calc(100vh-3.3rem)]">
				<Nav />
				<div className="pl-32 md:pl-52 lg:pl-64 w-full">
					<div
						id="detail"
						className="antialiased flex flex-col items-center mx-auto container px-4 pt-10 pb-24"
					>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default BaseTemplate;
