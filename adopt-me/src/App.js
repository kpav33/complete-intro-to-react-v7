// import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-dom";
import { StrictMode, useState, lazy, Suspense } from "react";
import ThemeContext from "./ThemeContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Pet from "./Pet";
// import SearchParams from "./SearchParams";
// import Details from "./Details";

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

// Use React lazy for code splitting to split code to be loaded later and gain performance boosts
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

// With JSX
const App = () => {
  const theme = useState("darkblue");

  return (
    // You have to wrap your app in a Provider. This is the mechanism by which React will notify the higher components to re-render whenever our context changes. Then whatever you pass into the value prop (we passed in the complete hook, the value and updated pair) will exit on the other side whenever we ask for it.
    // Note that the theme will only be available inside of this provider. So if we only wrapped the <Details> route with the Provider, that context would not be available inside of <SearchParams />.
    <ThemeContext.Provider value={theme}>
      <StrictMode>
        <div
          className="p-0 m-0"
          style={{
            background:
              "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
          }}
        >
          {/* <h1>Adopt Me!</h1> */}
          {/* React components must be capitalized, if you make it lower case, it will try to interpret pet as web component and not a React component */}
          {/* We pass props down as we would add tags to an HTML tag */}
          {/* <Pet name="Luna" animal="dog" breed="Havanese" />
      <Pet name="Pepper" animal="bird" breed="Cockatiel" />
      <Pet name="Doink" animal="cat" breed="Mix" /> */}
          {/* <SearchParams /> */}
          {/* Add React Route v6 for routing */}
          {/* An easy place to do code splitting and load code later is at the route level */}
          {/* Your initial bundle will load then after that it will resolve that you want to load another piece and show the loading component and only then load the desired code. In this case the Details page isn't too big so the potential savings aren't big, but in different cases the benefits could be substantial.  */}
          {/* Now our whole app loads async. What's great is that we can show the user something and then load the rest of the content. You get to make your page fast. */}
          <Suspense fallback={<h1>loading route …</h1>}>
            <BrowserRouter>
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                {/* :id is a variable that we can get from params */}
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </div>
      </StrictMode>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
