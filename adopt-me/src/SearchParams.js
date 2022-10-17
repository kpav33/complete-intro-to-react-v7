import { useState } from "react";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //   const location = "Seattle, WA";
  // This is a hook => Called a hook, because it gets "caught" every time the render function gets called. Because the hooks get called in the same order every single time, they will always point to the same piece of state. This means they can be stateful. You can keep mutable state in hooks that you can modify later.
  // Hooks rely on strict ordering. Do not put hooks inside if statements or loops!
  // The argument given to useState is its default value. useState returns an array with current value of state and a function to update that state. We use array destructuring to get the values.
  const [location, setLocation] = useState("Seattle, WA");

  // You can use useState as many times as you need for various pieces of state. This is why ordering is important because React relies on useState to be called in strictly the same order every time so it can give you the same piece of state.
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const breeds = [];

  // Initially the input value is fixed to Seattle, WA and you can't change it
  // If you try to type into the input box, React detects that a DOM event happened, so React thinks something has changed and runs a re-render of the page, it then diffs what's currently there and what its render pass came up with, then it updates the minimum amount of DOM necessary
  // Since we read the location value from a const, right now every time we re-render the page it just reads again the same value from the const and we can't change the value in the input field
  // Two way data binding is not free in React => We have to be explicit in how we handle data, in React we use hooks

  return (
    // Class is a reserved word in JS, so in JSX it's replaced with className, which is the name of JS API for interacting with class names
    <div className="search-params">
      <form>
        {/* Similarly for is also a reserved word in JS, so it is replaced in label with htmlFor */}
        <label htmlFor="location">
          Location
          {/* Every time input is typed into it calls the setLocation function, with what has been typed. When setLocation is called, React knows that state has been modified and kicks off a re-render.  */}
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            // We're using onChange and onBlur because it makes it more accessible
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
