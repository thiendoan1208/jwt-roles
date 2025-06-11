import type { ReactElement } from "react";
import "./globalStyle.css";

function GlobalStyle({ children }: { children: ReactElement }) {
  return <div>{children}</div>;
}

export default GlobalStyle;
