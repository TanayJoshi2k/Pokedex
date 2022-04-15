import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "./pokemon.module.css";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import PokemonCard from "../PokemonCard/PokemonCard";
import Footer from "../Footer/Footer";
import Gradients from "../Gradients/Gradients";

const Pokemon = () => {
  const baseURL = "https://pokeapi.co/api/v2/pokemon";
  const [currentPageURL, setCurrentPageURL] = useState(baseURL);
  const [pokemons, setPokemons] = useState([]);
  const [modal, setModal] = useState(false);
  const [pageURLs, setPageURLs] = useState([]);
  const [selectedPokemonData, setSelectedPokemonData] = useState({});

  function fetchDetails() {
    axios.get(currentPageURL).then((res) => {
      setPageURLs([res.data.previous, res.data.next]);
      let requests = res.data.results.map((pokemon) => {
        return axios.get(pokemon.url);
      });
      return Promise.all(requests).then((data) => {
        setPokemons(data);
      });
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetails();
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetails();
  }, [currentPageURL]);

  const toggleModalHandler = (
    isSet,
    pokemonName,
    pokemonImage,
    backgroundColor,
    abilities,
    stats,
    height,
    weight,
    types
  ) => {
    // The below setStates are batched together.
    setSelectedPokemonData({
      ...selectedPokemonData,
      name: pokemonName,
      imageURL: pokemonImage,
      backgroundColor: backgroundColor,
      abilities: abilities,
      stats: stats,
      height: height,
      weight: weight,
      types: types,
    });
    setModal(isSet);
  };
  const getPreviousPage = () => {
    if (pageURLs[0]) setCurrentPageURL(pageURLs[0]);
    else document.getElementById("pre").style.visibility = "hidden";
  };
  const getNextPage = () => {
    if (pageURLs[1]) setCurrentPageURL(pageURLs[1]);
    else setCurrentPageURL(baseURL);
  };
  return (
    <div>
      <div className={classes.pokemonContainer}>
        {pokemons.map((record, i) => {
            let color = Gradients(record.data.types);
            if (record.data.types.length === 2) {
              color = Gradients(
                record.data.types[0].type.name,
                record.data.types[1].type.name,
                record.data.types.length
              );
            } else {
              color = Gradients(
                record.data.types[0].type.name,
                record.data.types[0].type.name,
                record.data.types.length
              );
            }

            return (
              <PokemonCard
                toggleModal={() =>
                  toggleModalHandler(
                    true,
                    record.data.name,
                    record.data.sprites.front_default,
                    color,
                    record.data.abilities,
                    record.data.stats,
                    record.data.height,
                    record.data.weight,
                    record.data.types
                  )
                }
                types={record.data.types}
                name={record.data.name}
                image={record.data.sprites.front_default}
              />
            );
          })}
      </div>

      {modal && (
        <Modal
          toggleModal={toggleModalHandler}
          backgroundColor={selectedPokemonData["backgroundColor"]}
          name={selectedPokemonData["name"]}
          pokemonImage={selectedPokemonData["imageURL"]}
          abilities={selectedPokemonData["abilities"]}
          stats={selectedPokemonData["stats"]}
          height={selectedPokemonData["height"]}
          weight={selectedPokemonData["weight"]}
          types={selectedPokemonData["types"]}
        />
      )}

      {!modal && (
        <Footer
          modal={modal}
          previousPageURL={pageURLs[0]}
          nextPageURL={pageURLs[1]}
          goNext={getNextPage}
          goPrev={getPreviousPage}
        />
      )}
    </div>
  );
};
export default Pokemon;
