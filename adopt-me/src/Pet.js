// import React from "react";
import { Link } from "react-router-dom";

// export default function Pet({ name, animal, breed }) {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, name),
//     React.createElement("h2", {}, animal),
//     React.createElement("h2", {}, breed),
//   ]);
// }

// With JSX
// JSX translates HTML tags into React.createElement calls
const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  // return (
  //   <div>
  //     {/* Use {} to output JavaScript expressions in JSX */}
  //     <h1>{props.name}</h1>
  //     <h2>{props.animal}</h2>
  //     <h2>{props.breed}</h2>
  //   </div>
  // );

  return (
    // Changed a element to Link, because if we used a then every link you clicked would end up in the browser navigating to a whole new page which means React would totally reload your entire app all over again. With <Link> it can intercept this and just handle that all client-side. Much faster and a better user experience.
    // <Link to={`/details/${id}`} className="pet">
    <Link to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      {/* <div className="info"> */}
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
