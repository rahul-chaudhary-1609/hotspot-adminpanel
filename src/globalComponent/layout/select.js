import React from 'react';
import Select from 'react-select';

const customStyles = {
	control: (provided, state) => ({
		...provided,
		width: '100%',
		backgroundColor: '#fafafa',
		borderColor: 'grey',
		 borderRadius: '9999px',
	}),
	container: (provided, state) => ({
		...provided,
		width: '100%',
		borderRadius: '1.75rem',
		 backgroundColor: '#fafafa',
		borderColor: 'grey',
	}),
};

const CustomSelect = (props) => {
	return (
		<Select
			value={props.value}
			 styles={customStyles}
			menuPlacement='auto'
			options={props.options}
			inputId={props.id}
			placeholder={props.placeholder}
			onChange={props.handleChange}
		/>
	);
};

export default CustomSelect;
