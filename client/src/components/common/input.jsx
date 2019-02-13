import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="ui form error">
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} id={name} />
        {error && <div className="ui error message">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
