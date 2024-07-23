import { useRef } from 'react';
const Checkbox = ({ id, type, name,index,value,handleClick, isChecked,disabled1 }) => {
const ref = useRef([]);
    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleClick}
        ref={(element) => { ref.current[index] = element }}
        checked={isChecked}
        disabled={disabled1}
      />
    );
  };
  
  export default Checkbox;