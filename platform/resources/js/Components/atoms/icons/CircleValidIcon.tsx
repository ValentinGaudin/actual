import React, { HTMLProps } from 'react';

import circleValidIcon from '@/../images/icon-circle-check.svg';

const CircleValidIcon = ({
	className,
}: Pick<HTMLProps<HTMLElement>, 'className'>) => {
	return (
		<img
			src={circleValidIcon}
			alt={'icon en forme de cercle avec une icône de validation'}
			className={className}
		/>
	);
};

export default CircleValidIcon;
