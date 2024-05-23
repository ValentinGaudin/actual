import React, { HTMLProps } from 'react';

import circleExclamationIcon from '@/../images/icon-circle-exclamation.svg';

const CircleExclamationIcon = ({
	className,
}: Pick<HTMLProps<HTMLElement>, 'className'>) => {
	return (
		<img
			src={circleExclamationIcon}
			alt={"icône en forme de cercle avec un point d'exclamation à l'intérieur"}
			className={className}
		/>
	);
};

export default CircleExclamationIcon;
