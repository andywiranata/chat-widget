import React from 'react';
import './Compose.css';

const Compose = ({ rightItems, value, handeValueChange }) => {
  return (
    <div className="compose">
        <input
          onChange={(evt)=>{
            handeValueChange(evt.target.value)
          }}
          value={value}
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
        {rightItems}
    </div>
  )
};

export default Compose;