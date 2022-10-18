// import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";
import Details from "./Details";

// When you have distinct ideas represented as markup, it's a good idea to separate that into a component
// const Pet = (props) => {
//   // Props are variables that parent (App) passes to children (instance of Pet), where each prop can be different
//   // This is useful, because it makes components easily reusable with different data passed
//   // To make element have multiple children pass it an array of elements
//   return React.createElement("div", {}, [
//     // In createElement method the last two parameters are optional, since Pet component has no props or children we could just leave them empty
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     // We can reuse a component multiple times
//     // Component accepts props from parent
//     React.createElement(Pet, {
//       name: "Luna",
//       animal: "Dog",
//       breed: "Havanese",
//     }),
//     React.createElement(Pet, {
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cockatiel",
//     }),
//     React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
//   ]);
// };

// ReactDOM.render(React.createElement(App), document.getElementById("root"));

// When in development mode your development server will automatically be compiled with an environment variable of NODE_ENV=development and in production mode, when you build the app this variable will be changed to NODE_ENV=production
// React has a lot of debugging conveniences built into it out of the box. This conveniences get automatically removed, when you compile your code for production (this gets removed or added based on the value of the NODE_ENV enviroment variable). The dev bundle of React is bigger and slower than production build, so it is important to remove those conveniences for production build. Make sure you're compiling with the correct environmental variables or your users will suffer.

// With JSX
const App = () => {
  return (
    <StrictMode>
      <div>
        {/* <h1>Adopt Me!</h1> */}
        {/* React components must be capitalized, if you make it lower case, it will try to interpret pet as web component and not a React component */}
        {/* We pass props down as we would add tags to an HTML tag */}
        {/* <Pet name="Luna" animal="dog" breed="Havanese" />
      <Pet name="Pepper" animal="bird" breed="Cockatiel" />
      <Pet name="Doink" animal="cat" breed="Mix" /> */}
        {/* <SearchParams /> */}
        {/* Add React Route v6 for routing */}
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            {/* :id is a variable that we can get from params */}
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
