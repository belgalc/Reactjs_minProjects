import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [dice, SetDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollsCount, setRollsCount] = useState(0);
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allSameValue && allHeld) {
      setTenzies(true);
    }
  }, [dice]);
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  const clickedDie = (id) => {
    SetDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : { ...die };
      })
    );
  };
  const diceEls = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      handleClickedDie={() => clickedDie(die.id)}
    />
  ));
  const handleRoll = () => {
    setRollsCount((prevCount) => (prevCount = prevCount + 1));
    SetDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  };
  const newGame = () => {
    setTenzies(false);
    setRollsCount(0);
    SetDice(allNewDice());
  };
  const buttonText = tenzies ? "New Game" : "Roll";
  return (
    <div>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. <br />
          <br />
          Rolls count: {rollsCount}
        </p>
        <div className="dice--container">{diceEls}</div>
        <button onClick={tenzies ? newGame : handleRoll}>
          <h3>{buttonText}</h3>
        </button>
      </main>
      <footer>
        <p>
          Created by <span>BelgaLC</span> for practicing Reactjs
        </p>
      </footer>
    </div>
  );
}

export default App;
