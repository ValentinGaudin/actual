import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className="bg-blue-500 p-4 flex items-center justify-between">
			<div>
				<NavLink to={'/'}>
					<h1 className="text-white text-xl font-semibold">Actual</h1>
				</NavLink>
			</div>
			<div className="flex items-center space-x-4">
				<span className="text-white">Valentin</span>
			</div>
		</header>
	);
};

export default Header;
