import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import App from "../src/App";

// Listen on port 3000 by default
const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();

const parts = html.split("not rendered");

const app = express();

// We'll statically serve what Parcel built. Anything that Parcel doesn't serve, will be given our index.html. This lets the client-side app handle all the routing.
app.use("/frontend", express.static("dist/frontend"));
app.use((req, res) => {
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  //We use renderToString to take our app and render it to a string we can serve as HTML, sandwiched inside our outer HTML.
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
