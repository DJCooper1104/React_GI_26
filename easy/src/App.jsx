import React, { useState } from "react";
import "./App.css"; // Importing the CSS file for styling

function App() {
  const [count, setCount] = useState(0);

  function decrementCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function incrementCount() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter-container">
        <button className="counter-button" onClick={decrementCount}>
          -
        </button>
        <span className="counter-value">{count}</span>
        <button className="counter-button" onClick={incrementCount}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
