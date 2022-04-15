import React from "react";
import Gradients from "../Gradients/Gradients";
import classes from "./SearchPokemonCard.module.css";
const SearchPokemonCard = (props) => {
  const { types, toggleModal, pokemonImage, name } = props;

  let color = Gradients(types);
  if (types.length === 2) {
    color = Gradients(types[0].type.name, types[1].type.name, types.length);
  } else {
    color = Gradients(types[0].type.name, types[0].type.name, types.length);
  }
  return (
    <div>
      <div
        style={{ background: `linear-gradient(${color[0]}, ${color[1]})` }}
        className={classes.card}
        onClick={()=>{toggleModal(true)}}
      >
        <img
          className={classes.img}
          src={pokemonImage}
          alt="..."
          width="250"
          height="250"
        ></img>
        <p className={classes.name}>{name}</p>
        <div className={classes.types}>
          {types.map((type) => {
            return <p>{type.type.name}</p>;
          })}
        </div>
      </div>
      <button
        className={classes.backButton}
        onClick={() => {
          window.location.reload();
        }}
      >
        Back
      </button>
    </div>
  );
};

export default SearchPokemonCard;
