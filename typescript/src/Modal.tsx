// TypeScript is a thin layer on top of JavaScript that adds the power of a static checker to your code base.

import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

// TypeScript is smart enough to figure out types on its own, but in some cases you will have to write the types yourselves
const Modal: FunctionComponent = ({ children }) => {
  // Refs can be many things, so we are using a generic type here
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    // With TypeScript you have to make checks that your values aren't null, TypeScript will often warn you to make such checks
    if (!modalRoot || !elRef.current) {
      return;
    }

    modalRoot.appendChild(elRef.current);
    return () => {
      // Also a null check
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
