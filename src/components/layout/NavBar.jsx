import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

import homeImg from "./../../assets/menuIcons/pokeball.png";
import pokedexImg from "./../../assets/menuIcons/pikachu.png";
import movesImg from "./../../assets/menuIcons/fist.png";
import abilitiesImg from "./../../assets/menuIcons/tornado.png";
import itemsImg from "./../../assets/menuIcons/candy.png";
import typechartImg from "./../../assets/menuIcons/flash.png";
import locationsImg from "./../../assets/menuIcons/map.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const links = [
    "/",
    "pokedex",
    "moves",
    "abilities",
    "items",
    "locations",
    "type chart",
  ];

  const handleClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true);
      document.body.style.overflowY = "hidden";
    } else {
      const timeoutId = setTimeout(() => {
        setMenuVisible(false);
        document.body.style.overflowY = "auto";
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [menuOpen]);

  const linkImages = {
    "/": homeImg,
    pokedex: pokedexImg,
    moves: movesImg,
    abilities: abilitiesImg,
    items: itemsImg,
    "type chart": typechartImg,
    locations: locationsImg,
  };

  const mobileLinks = links.map((link) => {
    const linkImage = linkImages[link];
    return (
      <li key={link}>
        <Link to={link} onClick={handleClick}>
          <img src={linkImage} alt={`${link} icon`} className="link-icon" />
          {link === "/" ? "home" : link}
        </Link>
      </li>
    );
  });

  const desktopLinks = links.map((link) => {
    return (
      <li key={link}>
        <Link to={link}>{link === "/" ? "home" : link}</Link>
      </li>
    );
  });

  return (
    <nav className="nav-bar">
      <p>Logo</p>
      {menuOpen ? (
        <GrClose onClick={handleClick} className="nav-btn" />
      ) : (
        <HiMenuAlt3 onClick={handleClick} className="nav-btn" />
      )}
      <ul
        className={`mobile-menu ${
          isMenuVisible ? "slide-in-right" : "slide-out-right"
        }`}
      >
        {mobileLinks}
      </ul>

      <ul className="desktop-menu">{desktopLinks}</ul>
    </nav>
  );
};

export default NavBar;
