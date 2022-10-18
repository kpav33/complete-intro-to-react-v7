import { Component } from "react";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

// const Details = () => {
//   // This is the id that is marked as variable in App.js <Route /> component and then passed to the <Link /> component in the Pet.js file
//   // useParams() hook is used to get params from React Router
//   const { id } = useParams();

//   return <h2>{id}</h2>;
// };

// export default Details;

// Example with class components
// Every class component extends React.Component
class Details extends Component {
  // Not every component needs a constructor, we need it here to store some state
  //   constructor() {
  //     // If you have a constructor, you have to do the super(props) to make sure that the props are passed up to React so React can keep track of them
  //     super();
  //     this.state = { loading: true };
  //   }
  // Use class properties to make constructor easier to read, needs Babel class properties plugin to work with Parcel!
  state = { loading: true };

  // componentDidMount is a function that is called when the first rendering is completed, similar to useEffect with an empty array as dependancy
  // There are also other lifecycle methods available
  async componentDidMount() {
    // We are not getting props via parameters and state via useState we're getting it from the instance variables this.state and this.props. This is how it works with class components. Neither one will you mutate directly.
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    // this.state is the mutable state of the component (like useState). You'll use this.setState to mutate it (don't modify it directly.)
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  // Every class component has a render method that returns some sort of JSX / markup / call to React.createElement
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// React Router's API only exposes hooks. If you have a class component that is a route, this is how you can use it, make a wrapper component that uses the hook you need, and then pass that into the component. You'll find yourself frequently making these little wrapper components for things like this.
const WrappedDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;
