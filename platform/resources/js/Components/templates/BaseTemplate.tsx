import React, { PropsWithChildren } from 'react';

const BaseTemplate = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col relative min-h-screen bg-white dark:bg-dark-blue">
			{children}
		</div>
	);
};

export default BaseTemplate;
