import React from 'react'
import Select from 'react-select';  

const SelectComponent = ({
    field, 
    form: { touched, errors },
    ...props
  }) => (
    <div>
        <Select
            invalid={errors[field.name] ? true : false}
            defaultValue={props.defaultValue}          
            value={props.value}
            onChange={props.onChange}
            options={props.options}
      />
      {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]} </div>}
    </div>
  )

export default SelectComponent