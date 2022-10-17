import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

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

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    // We can reuse a component multiple times
    // Component accepts props from parent
    React.createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese",
    }),
    React.createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockatiel",
    }),
    React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
