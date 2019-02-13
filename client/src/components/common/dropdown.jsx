import React from "react";

const Dropdown = ({ label, items, onItemSelect, selectedItem, ...rest }) => {
  console.log(items);
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">
          item
        </a>

        <a className="dropdown-item">item</a>
      </div>
    </div>
  );
};

export default Dropdown;

// {items.map(item => (
//   <a
//     value={item._id}
//     key={item._id}
//     onClick={() => onItemSelect(item)}
//     className="dropdown-item"
//   >
//     {item.name}
//   </a>
// ))}
