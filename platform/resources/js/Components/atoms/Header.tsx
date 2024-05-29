import React from 'react';
import { NavLink } from 'react-router-dom';
import { ToggleTheme } from '@/Components/atoms/index';

const Header = () => {
	return (
		<header className="flex items-center justify-between px-4 bg-white/80 dark:bg-dark-blue/80 backdrop-blur border-b dark:border-gray-700 sticky top-0 z-50 w-full h-[3.3rem] transition-colors">
			<div>
				<NavLink to={'/'}>
					<h1 className="text-dark-blue dark:text-white text-xl font-semibold">
						Actual
					</h1>
				</NavLink>
			</div>
			<div className="flex items-center space-x-4">
				<ToggleTheme />
				<span className="dark:text-white text-dark-blue">Valentin</span>
			</div>
		</header>
	);
};

export default Header;
