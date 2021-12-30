import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  let abilities = props.abilities.map((element) => {
    return <p key={Math.random()}>{element.ability.name}</p>;
  });

  let stats = props.stats.map((e) => {
    return [e.stat.name, e.base_stat];
  });

  let type1 = props.types[0].type.name;

  return (
    <div>
      <div className={classes.ModalButtons}>
        <button
          className={classes.backButton}
          onClick={() => {
            props.toggleModal(false);
          }}
        >
          Back
        </button>
      </div>
      <div className={classes.ModalContainer}>
        <div
          className={classes.Modal}
          style={{
            background: `linear-gradient(${props.backgroundColor[0]}, ${props.backgroundColor[1]})`,
          }}
        >
          <div className={classes.imgContainer}>
            <div className={classes.translucent}></div>
            <div className={classes.name}>{props.name}</div>
            <img
              className={classes.img}
              src={props.pokemonImage}
              alt="..."
            ></img>
            <div className={classes.types}>
              <p style={{ display: "inline" }}>{type1} </p>
              <p style={{ display: "inline" }}>
                {props.types.length === 2 ? props.types[1].type.name : ""}
              </p>
            </div>
            <div className={classes.heightWeight}>
              <strong>Height</strong> {props.height / 10 + "m"}
            </div>
            <div className={classes.heightWeight}>
              <strong>Weight</strong> {props.weight / 10 + "kg"}
            </div>
          </div>
          <div className={classes.statsContainer}>
            <p className={classes.head}>Abilities</p>
            <div className={classes.abilities}>{abilities}</div>
            <p className={classes.head}>Base Stats</p>
            <div className={classes.stats}>
              <table>
                <tbody>
                  <tr>
                    <td>{stats[0][0]}</td>
                    <td>{stats[1][0]}</td>
                    <td>{stats[2][0]}</td>
                  </tr>
                  <tr>
                    <td>{stats[0][1]}</td>
                    <td>{stats[1][1]}</td>
                    <td>{stats[2][1]}</td>
                  </tr>
                  <tr>
                    <td>{stats[3][0]}</td>
                    <td>{stats[4][0]}</td>
                    <td>{stats[5][0]}</td>
                  </tr>
                  <tr>
                    <td>{stats[3][1]}</td>
                    <td>{stats[4][1]}</td>
                    <td>{stats[5][1]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
