import { useState, useEffect } from "react";

const Board = () => {
  const [show, setShow] = useState([]);
  // const [id, setId] = useState([]);
  const [prizes, setPrizes] = useState();
  const [selected, setSelected] = useState(null);
  const [chosen, setChosen] = useState([]);
  const [matched, setMatched] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const makeSquares = () => {
      const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      let array = [];
      while (array.length < 8) {
        const index = Math.floor(Math.random() * alpha.length);
        if (!array.includes(alpha[index])) {
          array.push(alpha[index]);
        }
      }
      array = [...array, ...array];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      setPrizes(array);
    };
    makeSquares();
  }, []);

  const showPrize = (index) => {
    // id.length < 2 && setId((prev) => [...prev, index]);
    setShow((prev) => prev.length < 2 && [...prev, index]);
    setSelected(index);
    setChosen((prev) => [...prev, prizes[index]]);
  };

  useEffect(() => {
    //  console.log(chosen.length);
    // console.log(chosen[0] === chosen[1] ? "match" : "no-match");
    let doesMatch = chosen.length === 2 && chosen[0] === chosen[1];
    if (chosen.length === 2) {
      setTimeout(() => {
        setShow([]);
        setChosen([]);

        // doesMatch && setSquares(squares.indexOf('chosen[0]'))
        if (doesMatch) {
          let x = prizes.reduce(function (a, e, i) {
            if (e === chosen[0]) a.push(i);
            return a;
          }, []);

          const newPrizes = [...prizes];
          newPrizes[x[0]] = "";
          newPrizes[x[1]] = "";
          setPrizes(newPrizes);
        }
      }, 2000);
    }
  }, [chosen]);

  return (
    <div className="squares">
      {console.log("here", prizes)}
      {prizes &&
        prizes.map((prize, index) => (
          <div
            key={index}
            onClick={() => show.length < 2 && showPrize(index)}
            className={`square ${
              (show[0] === index || show[1] === index) && "show"
            } ${prize === "" && "background"}`}
          >
            {/* {console.log(show, index)} */}
            {show.length < 3 && !show.includes(index)
              ? prize === ""
                ? ""
                : index + 1
              : prize}
          </div>
        ))}
      <div className="background-plate"></div>
    </div>
  );
};

export default Board;
