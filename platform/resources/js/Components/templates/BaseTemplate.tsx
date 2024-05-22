import React, { PropsWithChildren } from 'react';

import { Nav, Header } from '@/Components/atoms';

const BaseTemplate = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			<div className="flex h-[calc(100vh-3.3rem)]">
				<Nav />
				<div className="pl-[19.5rem] w-full">
					<div className="antialiased w-full mx-auto px-8 pt-10 pb-24">
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default BaseTemplate;
