import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Server-side rendering is a technique where you run React on your Node.js server before you serve the request to the user and send down the first rendering of your website already done.
// This saves precious milliseconds+ on your site because otherwise the user has to download the HTML, then download the JavaScript, then execute the JS to get the app. In this case, they'll just download the HTML and see the first rendered page while React is loading in the background.
// While the total time to when the page is actually interactive is comparable, if a bit slower, the time to when the user sees something for the first time should be much faster, hence why this is a popular technique.

// We need to remove all references to window or anything browser related from a path that could be called in Node. That means whenever we reference window, it'll have to be inside componentDidMount (useEffect) since componentDidMount doesn't get called in Node.

// This code will only run in the browser, so any sort of browser related stuff can be done here (like analytics). We're also using ReactDOM.hydrate instead of ReactDOM.render because this will hydrate existing markup with React magic rather than render it from scratch.
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
