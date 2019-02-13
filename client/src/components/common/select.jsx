import React from "react";
import { Field } from "redux-form";

const Select = ({ name, label, error, value, item, ...rest }) => {
  return (
    <div className="ui form error">
      <div className="field mt-1">
        <label>{label}</label>
        <div>
          <Field name="vehicleTypeId" component="select">
            <option value="">Select one...</option>
            {item.map(item => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default Select;
