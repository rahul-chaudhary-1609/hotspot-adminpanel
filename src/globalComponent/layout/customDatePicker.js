import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { propertyOf } from 'lodash-es';

const CustomDatePicker = (props) => {
	let newProps = { ...props };
	if (!props.defaultValue) {
		delete newProps['defaultValue'];
	}
	if (!props.value) {
		delete newProps['value'];
	}
	return (
		<DatePicker picker={props.picker} key={props.id} defaultValue={props.defaultValue} format={props.format} />
	);
};

export default CustomDatePicker;
