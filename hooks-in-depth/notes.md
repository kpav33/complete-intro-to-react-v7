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

## useRef

You can use Refs to emulate instance variables from React. In order to understand why refs are useful, you need to understand how closures work. In our component, when a user clicks, it sets a timeout to log both the state and the ref's number after a second. One thing to keep in mind that **the state and the ref's number are always the same**. They are never out of lockstep since they're updated at the same time. *However*, since we delay the logging for a second, when it alerts the new values, it will capture what the state was when we first called the timeout (since it's held on to by the closure) but it will always log the current value since that ref is on an object that React consistently gives the same object back to you. Because it's the same object and the number is a property on the object, it will always be up to date and not subject to the closure's scope.

Why is this useful? It can be useful for things like holding on to *setInterval* and *setTimeout* IDs so they can be cleared later. Or any bit of statefulness that could change but you don't want it to cause a re-render when it does. It's also useful for referencing DOM nodes directly.

```js
import { useState, useRef } from "react";

const RefComponent = () => {
  const [stateNumber, setStateNumber] = useState(0);
  const numRef = useRef(0);

  function incrementAndDelayLogging() {
    setStateNumber(stateNumber + 1);
    numRef.current++;
    setTimeout(
      () => alert(`state: ${stateNumber} | ref: ${numRef.current}`),
      1000
    );
  }

  return (
    <div>
      <h1>useRef Example</h1>
      <button onClick={incrementAndDelayLogging}>delay logging</button>
      <h4>state: {stateNumber}</h4>
      <h4>ref: {numRef.current}</h4>
    </div>
  );
};

export default RefComponent;
```

## useReducer

*useReducer* allows us to do Redux-style reducers but inside a hook. Here, instead of having a bunch of functions to update our various properties, we have one reducer that handles all the updates based on an action type. This is a preferable approach if you have complex state updates or if you have a situation like this: all of the state updates are very similar so it makes sense to contain all of them in one function.

```js
import { useReducer } from "react";

// fancy logic to make sure the number is between 0 and 255
const limitRGB = (num) => (num < 0 ? 0 : num > 255 ? 255 : num);

const step = 50;

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_R":
      return Object.assign({}, state, { r: limitRGB(state.r + step) });
    case "DECREMENT_R":
      return Object.assign({}, state, { r: limitRGB(state.r - step) });
    case "INCREMENT_G":
      return Object.assign({}, state, { g: limitRGB(state.g + step) });
    case "DECREMENT_G":
      return Object.assign({}, state, { g: limitRGB(state.g - step) });
    case "INCREMENT_B":
      return Object.assign({}, state, { b: limitRGB(state.b + step) });
    case "DECREMENT_B":
      return Object.assign({}, state, { b: limitRGB(state.b - step) });
    default:
      return state;
  }
};

const ReducerComponent = () => {
  const [{ r, g, b }, dispatch] = useReducer(reducer, { r: 0, g: 0, b: 0 });

  return (
    <div>
      <h1 style={{ color: `rgb(${r}, ${g}, ${b})` }}>useReducer Example</h1>
      <div>
        <span>r</span>
        <button onClick={() => dispatch({ type: "INCREMENT_R" })}>➕</button>
        <button onClick={() => dispatch({ type: "DECREMENT_R" })}>➖</button>
      </div>
      <div>
        <span>g</span>
        <button onClick={() => dispatch({ type: "INCREMENT_G" })}>➕</button>
        <button onClick={() => dispatch({ type: "DECREMENT_G" })}>➖</button>
      </div>
      <div>
        <span>b</span>
        <button onClick={() => dispatch({ type: "INCREMENT_B" })}>➕</button>
        <button onClick={() => dispatch({ type: "DECREMENT_B" })}>➖</button>
      </div>
    </div>
  );
};

export default ReducerComponent;
```

## useMemo

*useMemo* and *useCallback* are performance optimizations. Use them only when you already have a performance problem instead of pre-emptively. It adds unnecessary complexity otherwise. *useMemo* memoizes expensive function calls so they are only re-evaluated when needed.

In the example we are calculating the fibonacci sequence, which gets computationally quite expensive when you are calling fibonacci 30+. With useMemo it will now only call fibonacci if count changes and will just read the previous, memoized answer if it hasn't changed.

If we didn't have the useMemo call, everytime some other piece of state would change, it'd unnecessarily recalculate the answer of fibonacci but because we did use useMemo it will only calculate it when num has changed.

```js
import { useState, useMemo } from "react";

const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const fib = useMemo(() => fibonacci(num), [num]);

  return (
    <div>
      <h1
        onClick={() => setIsGreen(!isGreen)}
        style={{ color: isGreen ? "limegreen" : "crimson" }}
      >
        useMemo Example
      </h1>
      <h2>
        Fibonacci of {num} is {fib}
      </h2>
      <button onClick={() => setNum(num + 1)}>➕</button>
    </div>
  );
};

export default MemoComponent;
```

## useCallback

*useCallback* is quite similar and indeed it's implemented with the same mechanisms as *useMemo*. Our goal is that *ExpensiveComputationComponent* only re-renders whenever it absolutely must. Typically whenever React detects a change higher-up in an app, it re-renders everything underneath it. This normally isn't a big deal because React is quite fast at normal things. However you can run into performance issues sometimes where some components are bad to re-render without reason.

In this case, we're using a new feature of React called *React.memo*. This is similar to *PureComponent* where a component will do a simple check on its props to see if they've changed and if not it will not re-render this component (or its children, which can bite you). *React.memo* provides this functionality for function components. Given that, we need to make sure that the function itself given to *ExpensiveComputationComponent* is the same function every time. We can use *useCallback* to make sure that React is handing the same fibonacci to ExpensiveComputationComponent every time so it passes its *React.memo* check every single time. Now only if count changes will it actually re-render.

```js
import { useState, useEffect, useCallback, memo } from "react";

const ExpensiveComputationComponent = memo(({ compute, count }) => {
  return (
    <div>
      <h1>computed: {compute(count)}</h1>
      <h4>last re-render {new Date().toLocaleTimeString()}</h4>
    </div>
  );
});

const CallbackComponent = () => {
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });

  const fibonacci = (n) => {
    if (n <= 1) {
      return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  return (
    <div>
      <h1>useCallback Example {time.toLocaleTimeString()}</h1>
      <button onClick={() => setCount(count + 1)}>
        current count: {count}
      </button>
      <ExpensiveComputationComponent
        compute={useCallback(fibonacci, [])}
        count={count}
      />
    </div>
  );
};

export default CallbackComponent;
```