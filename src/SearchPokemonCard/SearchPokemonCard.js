import React from 'react';
import Gradients from "../Gradients/Gradients";
import classes from './SearchPokemonCard.module.css'
const SearchPokemonCard = (props) => {
    let color = Gradients(props.types);
    if (props.types.length === 2) {
      color = Gradients(
        props.types[0].type.name,
        props.types[1].type.name,
        props.types.length
      );
    } else {
      color = Gradients(
        props.types[0].type.name,
        props.types[0].type.name,
        props.types.length
      );
    }
    return (
      <div>
        <div
          style={{ background: `linear-gradient(${color[0]}, ${color[1]})` }}
          className={classes.card}
          onClick={props.toggleModal}
        >
          <img className={classes.img} src={props.image} alt="..." width="250" height="250"></img>
          <p>{props.name}</p>
          <div className={classes.types}>
              {props.types.map((type) => {
                return <p>{type.type.name}</p>;
              })}

          </div>
        </div>
                  <button className={classes.backButton} 
                  onClick={() => {
                    window.location.reload();
                  }}
        >Back</button>
        </div>
      );
}

export default SearchPokemonCard;