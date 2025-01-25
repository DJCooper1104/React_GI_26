import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieSearch from "./components/movie.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MovieSearch />
    </>
  );
}

export default App;
