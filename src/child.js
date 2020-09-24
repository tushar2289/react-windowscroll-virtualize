import React, { useState } from "react";

function Child({ row, isOpened, open, measure }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setTimeout(measure, 100);
  };

  return (
    <div className="row" onClick={handleClick}>
      <div className="name">{row.name}</div>
      {isOpen && <div className="text">{row.randomLong}</div>}
    </div>
  );
}

export default Child;
