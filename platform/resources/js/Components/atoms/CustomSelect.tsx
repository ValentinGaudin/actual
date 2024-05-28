import { DropdownIndicatorProps } from 'react-select';
import React from 'react';
import Select from 'react-select/base';

const DropdownIndicator = (
	props: DropdownIndicatorProps<ColourOption, true>
) => {
	return (
		<DropdownIndicator {...props}>
			<EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
		</DropdownIndicator>
	);
};

export default () => (
	<Select
		closeMenuOnSelect={false}
		components={{ DropdownIndicator }}
		// defaultValue={''}
		isMulti={true}
		// options={colourOptions}
	/>
);