import React from 'react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';

const CustomTimePicker = (props) => {
	let newProps = { ...props };
	if (!props.defaultValue) {
		delete newProps['defaultValue'];
	}
	if (!props.value) {
		delete newProps['value'];
	}
	return (
		<TimePicker
			key={newProps.defaultValue ? newProps.id + 'active' : newProps.id}
			{...newProps}
		/>
	);
};

export default CustomTimePicker;
