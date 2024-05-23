import React from 'react';
import { NavLink } from 'react-router-dom';

const AddCandidate = () => {
	return (
		<NavLink to={'/candidate/new'}>
			<button className="middle none center rounded-lg bg-green-400/90 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none">
				Ajouter un candidat
			</button>
		</NavLink>
	);
};

export default AddCandidate;
