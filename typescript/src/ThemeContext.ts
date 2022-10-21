import { createContext } from "react";

// We are telling TypeScript we have a strict ordering of a string and function. This will TypeScript enforce for us later.
const ThemeContext = createContext<[string, (theme: string) => void]>([
  "green",
  () => {},
]);

export default ThemeContext;
