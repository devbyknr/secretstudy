import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{count}</h3>
        <button
          data-testid="minusButton"
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <button
          data-testid="plusButton"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
        <div>
          <button data-testid="onOffButton" style={{ backgroundColor: "blue" }}>
            {" "}
            ON/ OFF
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
