import { createContext } from "react";

// Context is like state, but instead of being confined to a component, it's global to your application. It's application-level state. This is dangerous. Avoid using context until you have to use it. One of React's primary benefit is it makes the flow of data obvious by being explicit.
// Context mostly replaces Redux, use one or another, usually you don't need to use both
// Imagine if we wanted to let the user choose a simple theme for the site. And we want to make that theme stick as the user navigates across different pages => We can use Context for this
// You can have multiple layers of context. If I wrapped SearchParams in its own Provider (in addition to the one that already exists), the SearchParams context would read from that because it's the closest one whereas Details would read from the top level one because it's the only one.
// That's it for context! Something like theming would be perfect for context. It's for app-level data. Everything else should be boring-ol' state.
// You can think of context like a wormhole: whatever you chuck in one side of the wormhole is going to come out the other side.

// createContext is a function that returns an object with two React components in it: a Provider and a Consumer. A Provider is how you scope where a context goes. A context will only be available inside of the Provider. You only need to do this once.
// A Consumer is how you consume from the above provider. A Consumer accepts a function as a child and gives it the context which you can use. We won't be using the Consumer directly: a function called useContext will do that for us.
// The array in createContext represents the return value when using useState, which returns an array of the current value and a function that is used to change the state
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
