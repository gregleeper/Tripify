import React from "react";

const Input = ({ input, name, label, type, id, meta: { error, touched } }) => {
  return (
    <div
      className="ui form error"
      style={{ marginLeft: "20%", marginRight: "20%" }}
    >
      <div className="field mt-1">
        <label>{label}</label>
        <input type={type} name={name} id={id} {...input} />
        <div className="ui error message">{touched && error}</div>
      </div>
    </div>
  );
};

export default Input;
