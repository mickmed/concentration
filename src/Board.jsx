import { useState, useEffect } from "react";

const Board = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState([])

  const squares = []

  for (let i = 0; i < 16; i++) {
    squares.push(<div></div>);
  }

  const showSquare = (index) => {
    id.length < 2 && setId(prev => [...prev, index])
    setShow(!show);
  };

  return (
    <div className="squares">
      {squares.map((square, index) => (
        <div onClick={()=>showSquare(index)} className= "square {(id[0] === index) && 'orange'}">
          {square}
        </div>
      ))}
    </div>
  );
};

export default Board;
