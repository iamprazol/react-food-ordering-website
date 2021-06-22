import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <nav className="slidemenu">
      <NavBar id="slide-item-1" icon="ℋ" links="/" title="Home" />
      <NavBar id="slide-item-2" icon="★" links="/cusines" title="Cusines" />
      <NavBar
        id="slide-item-3"
        icon="♬"
        links="/restaurants"
        title="Restaurants"
      />
      <NavBar id="slide-item-4" icon="ヅ" links="/specials" title="Specials" />

      <div className="clear" />

      <div className="slider">
        <div className="bar" />
      </div>
    </nav>
  );
};

export default Header;
