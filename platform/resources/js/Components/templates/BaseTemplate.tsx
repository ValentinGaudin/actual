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
					<div className="antialiased flex flex-col mx-auto px-8 pt-10 pb-24">
						<div id="detail">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BaseTemplate;
