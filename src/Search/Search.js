import React from "react";
import classes from "./Search.module.css";

const Search = (props) => {

  const {searchPokemon, getSearchPokemon} = props;
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
            onChange={(e) => searchPokemon(e.target.value)}
            onKeyDown={getSearchPokemon}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Search;
