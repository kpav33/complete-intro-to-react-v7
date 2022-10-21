import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

// Should you use TypeScript?
// However, now that we're playing TypeScript land, this code would be joyous to work on. Visual Studio Code will autocomplete for you. TypeScript will instantly let you know when you've made a mistake. You can launch new code with higher certainty that you haven't created run time errors. This all comes at the cost of taking longer to write. Ask yourself if that's a trade-off you're willing to make: if you're a tiny startup that may not happen. If you're as large as Microsoft, maybe! It's a trade-off like all things are. It is a question you should answer before you start a new code base: should we type check?

const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
