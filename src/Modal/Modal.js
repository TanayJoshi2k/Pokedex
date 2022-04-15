import React from "react";
import { useEffect } from "react/cjs/react.development";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const {
    abilities,
    stats,
    types,
    toggleModal,
    backgroundColor,
    name,
    pokemonImage,
    height,
    weight,
  } = props;

  let abilities_arr = abilities.map((element) => {
    return <p key={Math.random()}>{element.ability.name}</p>;
  });

  let pokeStats = stats.map((e) => {
    return [e.stat.name, e.base_stat];
  });

  let type1 = types[0].type.name;

  return (
    <div className={classes.ModalContainer} onClick={()=> {toggleModal(false)}}>
      
      <div
        className={classes.Modal}
        style={{
          background: `linear-gradient(${backgroundColor[0]}, ${backgroundColor[1]})`,
        }}
      >
        <div className={classes.imgContainer}>
          <div className={classes.translucent}></div>
          <div className={classes.name}>{name}</div>
          <img className={classes.img} src={pokemonImage} alt="..."></img>
          <div className={classes.types}>
            <p style={{ display: "inline" }}>{type1} </p>
            <p style={{ display: "inline" }}>
              {types.length === 2 ? types[1].type.name : ""}
            </p>
          </div>
          <div className={classes.heightWeight}>
            <strong>Height</strong> {height / 10 + "m"}
          </div>
          <div className={classes.heightWeight}>
            <strong>Weight</strong> {weight / 10 + "kg"}
          </div>
        </div>
        <div className={classes.statsContainer}>
          <p className={classes.head}>Abilities</p>
          <div className={classes.abilities}>{abilities_arr}</div>
          <p className={classes.head}>Base Stats</p>
          <div className={classes.stats}>
            <table>
              <tbody>
                <tr>
                  <td>{pokeStats[0][0]}</td>
                  <td>{pokeStats[1][0]}</td>
                  <td>{pokeStats[2][0]}</td>
                </tr>
                <tr>
                  <td>{pokeStats[0][1]}</td>
                  <td>{pokeStats[1][1]}</td>
                  <td>{pokeStats[2][1]}</td>
                </tr>
                <tr>
                  <td>{pokeStats[3][0]}</td>
                  <td>{pokeStats[4][0]}</td>
                  <td>{pokeStats[5][0]}</td>
                </tr>
                <tr>
                  <td>{pokeStats[3][1]}</td>
                  <td>{pokeStats[4][1]}</td>
                  <td>{pokeStats[5][1]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
