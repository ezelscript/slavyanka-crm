import { useEffect } from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import { ChildrenProps } from "../../types";

function Modal({ children }: ChildrenProps) {
  useEffect(() => {
    document.body.classList.add("blocked");
    return () => document.body.classList.remove("blocked");
  }, []);

  return createPortal(<Overlay>{children}</Overlay>, document.body);
}

export default Modal;
