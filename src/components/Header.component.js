import React, { useContext } from "react";
import { Context } from "../state/context";

const Header = () => {
  const { store } = useContext(Context);
  return (
    <header className="header--wrapper">
      <h1 className="header__title">
        <a className="link" href="/">
          Podcaster
        </a>
      </h1>
      <div className={store.playing ? "playing pulse" : ""}></div>
    </header>
  );
};

export default Header;
