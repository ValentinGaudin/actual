import React from 'react';

import { Nav, Header } from '@/Components/atoms';
import Root from '@/routes/root';

const BaseTemplate = () => {
	return (
		<>
			<Header />
			<div className="flex">
				<Nav />
				<Root />
			</div>
		</>
	);
};

export default BaseTemplate;
