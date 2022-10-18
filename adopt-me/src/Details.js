import { Component } from "react";
import { useParams } from "react-router-dom";

import ThemeContext from "./ThemeContext";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

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
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  // Every class component has a render method that returns some sort of JSX / markup / call to React.createElement
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          {/* <button>Adopt {name}</button> */}
          {/* This is how you use Context inside of a class component, remeber you can't use hooks, so we are using the consumer from ThemeContext. Functionally this works the same as useContext hook in functional component */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {/* Notice that despite we're rendering a whole different part of the DOM we're still referencing the state in Details.js. This is the magic of Portals. You can use state but render in different parts of the DOM. Imagine a sidebar with contextual navigation. Or a contextual footer. It opens up a lot of cool possibilities. */}
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// React Router's API only exposes hooks. If you have a class component that is a route, this is how you can use it, make a wrapper component that uses the hook you need, and then pass that into the component. You'll find yourself frequently making these little wrapper components for things like this.
const WrappedDetails = () => {
  const params = useParams();
  return (
    // Wrap Details component with the ErrorBoundary component
    // This is totally self contained. No one rendering Details has to know that it has its own error boundary. Some prefer doing this in App.js or at the Router level
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
