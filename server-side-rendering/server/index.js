import express from "express";
// import { renderToString } from "react-dom/server";
// With HTTP requests, you can actually send responses in chunks. This is called streaming your request. When you stream a request, you send partially rendered bits to your client so that the browser can immediately start processing the HTML rather than getting one big payload at the end. Really, the biggest win is that browser can immediately start downloading CSS while you're still rendering your app.
import { renderToNodeStream } from "react-dom/server";
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
// app.use((req, res) => {
//   const reactMarkup = (
//     <StaticRouter location={req.url}>
//       <App />
//     </StaticRouter>
//   );

//   //We use renderToString to take our app and render it to a string we can serve as HTML, sandwiched inside our outer HTML.
//   res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
//   res.end();
// });

// Node has a native type called a stream. A stream, similar to a bash stream, is a stream of data that can be piped into something else. In this case, we have a Node stream of React markup being rendered. As each thing is rendered, React fires off a chunk that then can be sent to the user more quickly.
app.use((req, res) => {
  // First thing we do is immediately write the head to the user. This way they can grab the <head> which the CSS <link> tag in it, meaning they can start the CSS download ASAP.
  res.write(parts[0]);
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  // From there we start streaming the React markup to the user.
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  //   After we finish with that stream, we write the end of the index.html page and close the connection.
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
