import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// You can think of the portal as a separate mount point (the actual DOM node which your app is put into) for your React app. A common use case for this is going to be doing modals. You'll have your normal app with its normal mount point and then you can also put different content into a separate mount point (like a modal or a contextual nav bar) directly from a component.

// This will mount a div and mount inside of the portal whenever the Modal is rendered and then remove itself whenever it's unrendered.
const Modal = ({ children }) => {
  // Refs are like instance variables for function components. They're containers of state that live outside a function's closure state which means anytime I refer to elRef.current, it's always referring to the same element. This is different from a useState call because the variable returned from that useState call will always refer to the state of the variable when that function was called.
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // We're using the feature of useEffect that if you need to clean up after you're done (we need to remove the div once the Modal is no longer being rendered) you can return a function inside of useEffect that cleans up.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // Use React's createPortal to pass the children (whatever you put inside <Modal></Modal>) to the portal div
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
