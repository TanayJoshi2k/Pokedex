import React from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import classes from "./Search.module.css";

const Search = (props) => {

  return (
    <div className={classes.parent}>
      <form>
        <div className={classes.inputContainer}>
          <img
            className={classes.search}
            src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          />
          <input
            type="text"
            placeholder="Hit Enter"
            onChange={(e) => props.searchPokemon(e.target.value)}
            onKeyDown={props.getSearchPokemon}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Search;
