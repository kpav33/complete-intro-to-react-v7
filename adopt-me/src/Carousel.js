import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // Set a default prop which allows you to set props that a component has by default if they're not furnished by parent
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // Notice that the handleIndexClick function is an arrow function. This is because we need the this in handleIndexClick to be the correct this. An arrow function assures that because it will be the scope of where it was defined. This is common with how to deal with event handlers with class components
  handleIndexClick = (event) => {
    this.setState({
      // Data attribute comes back as string, we want it to be a number, hence the +
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              // Handle click event
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
