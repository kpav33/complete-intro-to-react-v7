// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

// Anything that is a child of this component will have errors caught here
// This could be more flexbile, depends if you prefer the DRY (don't repeat yourself) or WET (write everything twice => If you use one piece of code twice, adjust it so that it works for both cases, if more than two times, create it reusable so that it will work for all possible cases) code rule
class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  // A static method is one that can be called on the constructor
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // If you awnt to be defensive with API, due to possibilities of getting malformatted or otherwise weird data that could lead to errors, you can use componentDidCatch. This is something that has no equivalent in hooks syntax, so if you needed this sort of functionality you'd have to use a class component.
  // A component can only catch errors in its children, so that's important to keep in mind. It cannot catch its own errors.
  // If you want to call an error logging service, componentDidCatch would be an amazing place to do that.
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  // componentDidUpdate is how you react to state and prop changes with class components
  componentDidUpdate() {
    // If there is an error, redirect the user to the root page automatically after five seconds
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      // Rendering Navigate components is how you do redirects with React Router, you could also do this programatically
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
