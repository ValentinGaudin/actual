import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
	return (
		<div id="detail" className="grow p-4 lg:p-8 xl:p12">
			<Outlet />
		</div>
	);
};

export default Root;
