import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<aside className="fixed top-[3.3rem] dark:bg-dark-blue dark:text-white bg-white text-dark transition-colors w-32 md:w-52 lg:w-64 h-[100vh]">
			<nav>
				<ul className="w-full p-4">
					<li>
						<NavLink
							to={`/candidates`}
							className="p-2 flex items-center group w-32 text-red-500 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:origin-bottom-right after:transition-transform after:duration-500 after:ease-in-out after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100"
						>
							<p className="active:text-red-600/90">Candidats</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Nav;
