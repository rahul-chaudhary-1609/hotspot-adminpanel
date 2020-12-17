import React from 'react'
import { Input } from 'reactstrap'

const GlobalInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}) => (
    <div>
      <div className="form-group">
        <Input  {...field} {...props} />
      </div>
      <div>
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]} </div>}
      </div>
    </div>

  );

export default GlobalInputComponent