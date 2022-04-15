import React from "react";
import Gradients from "../Gradients/Gradients";
import classes from "./PokemonCard.module.css";

const PokemonCard = (props) => {

  const {types, toggleModal, image, name} = props;


  let color = Gradients(types);
  if (types.length === 2) {
    color = Gradients(
      types[0].type.name,
      types[1].type.name,
      types.length
    );
  } else {
    color = Gradients(
      types[0].type.name,
      types[0].type.name,
      types.length
    );
  }
  return (
    <div
      style={{ background: `linear-gradient(${color[0]}, ${color[1]})` }}
      className={classes.gridItem}
      onClick={() => {toggleModal(true)}}
    >
      <img
        className={classes.img}
        src={image}
        alt="..."
        width="250"
        height="250"
      ></img>
      <p className={classes.name}>{name}</p>
      <div className={classes.types}>

          {types.map((type) => {
            return (
              <p key={Math.random()}>
                {type.type.name}
              </p>
            );
          })}
        </div>
    </div>
  );
};

export default PokemonCard;
