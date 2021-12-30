import React from "react";
import "../Navbar/Navbar.module.css";
import classes from './Navbar.module.css'
const Navbar = (props) => {
  return (
    <div>
      <header>
        <nav>
          <div className={classes.navImage}>
            <img
              alt="..."
              src="https://pokedex-react-mui.netlify.app/static/media/pokedex.2800773d.png"
            ></img>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
