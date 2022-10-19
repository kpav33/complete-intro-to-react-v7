Examples are located at [CodeSandbox](https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main/?file=/src/index.js).

## useState

*useState* allows us to make our components stateful. Whereas this previously required using a class component, hooks give us the ability to write it using just functions. It allows us to have more flexible components. In our example component, everytime you click on the h1 (bad a11y, by the way) it'll change colors. It's doing this by keeping that bit of state in a hook which is being fed in anew every render so it always has the latest state.

```js
import { useState } from "react";

const StateComponent = () => {
  const [isGreen, setIsGreen] = useState(true);

  return (
    <h1
      onClick={() => setIsGreen(!isGreen)}
      style={{ color: isGreen ? "limegreen" : "crimson" }}
    >
      useState Example
    </h1>
  );
};

export default StateComponent;
```

## useEffect

Effects are how you recreate *componentDidMount*, *componentDidUpdate*, and *componentDidUnmount* from React. Inside *useEffect*, you can do any sort of side-effect type action that you would have previously done in one of React's lifecycle method. You can do things like fire AJAX requests, integrate with third party libraries (like a jQuery plugin), fire off some telemetry, or anything else that need to happen on the side for your component.

In our case, we want our component to continually update to show the time so we use setTimeout inside our effect. After the timeout calls the callback, it updates the state. After that render happens, it schedules another effect to happen, hence why it continues to update. You could provide a second parameter of [] to useEffect (after the function) which would make it only update once. This second array is a list of dependencies: only re-run this effect if one of these parameters changed. In our case, we want to run after every render so we don't give it this second parameter.

```js
import { useState, useEffect } from "react";

const EffectComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });

  return <h1>useEffect Example: {time.toLocaleTimeString()}</h1>;
};

export default EffectComponent;

```

## useContext

Early problem with React was prop drilling. Passing down data through multiple components that don't actually need it, but are acting just as intermediaries to pass the data to the right component. Context allows you to create a wormhole where stuff goes in and a wormhole in a child component where that same data comes out and the stuff in the middle doesn't know it's there. Now that data is available anywhere inside of the *UserContext.Provider*. *useContext* just pulls that data out when given a Context object as a parameter.

In general, context adds a decent amount of complexity to an app. A bit of prop drilling is fine. Only put things in context that are truly application-wide state like user information or auth keys and then use local state for the rest.

```js
import { useState, useContext, createContext } from "react";

const UserContext = createContext([
  {
    firstName: "Bob",
    lastName: "Bobberson",
    suffix: 1,
    email: "bobbobberson@example.com"
  },
  (obj) => obj
]);

const LevelFive = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h5>{`${user.firstName} ${user.lastName} the ${user.suffix} born`}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { suffix: user.suffix + 1 }));
        }}
      >
        Increment
      </button>
    </div>
  );
};

const LevelFour = () => (
  <div>
    <h4>fourth level</h4>
    <LevelFive />
  </div>
);

const LevelThree = () => (
  <div>
    <h3>third level</h3>
    <LevelFour />
  </div>
);

const LevelTwo = () => (
  <div>
    <h2>second level</h2>
    <LevelThree />
  </div>
);

const ContextComponent = () => {
  const userState = useState({
    firstName: "James",
    lastName: "Jameson",
    suffix: 1,
    email: "jamesjameson@example.com"
  });

  return (
    <UserContext.Provider value={userState}>
      <h1>first level</h1>
      <LevelTwo />
    </UserContext.Provider>
  );
};

export default ContextComponent;
```