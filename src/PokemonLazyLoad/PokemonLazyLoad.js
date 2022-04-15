//Import Axios and React

import axios from "axios";
import React, { useState, useEffect } from "react";

// Import CSS
import classes from "../Pokemon/pokemon.module.css";

// Import Components
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Modal from "../Modal/Modal";
import PokemonCard from "../PokemonCard/PokemonCard";
import SearchPokemonCard from "../SearchPokemonCard/SearchPokemonCard";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import Gradients from "../Gradients/Gradients";

const PokemonLazyLoad = () => {
  const baseURL = "https://pokeapi.co/api/v2/pokemon/";
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchPokemonData, setSearchPokemonData] = useState({});
  const [selectedPokemonData, setSelectedPokemonData] = useState({});
  const [modal, setModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searching, setSearching] = useState(false);

  const getSearchPokemon = (e) => {
    if (e.key === "Enter" && e.target.value != "") {
      setSearching(true);
      e.preventDefault();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`)
        .then((res) => {
          setSearchPokemonData(res.data);
          setSearching(false);
        })
        .catch(() => console.log("No matching pokemon found!"));
    }
  };

  const getPosts = (offset, limit) => {
    axios
      .get(baseURL + `?offset=${offset}&limit=${limit - offset}`)
      .then((res) => {
        let requests = res.data.results.map((pokemon) => {
          return axios.get(pokemon.url);
        });
        return Promise.all(requests).then((data) => {
          setPokemons([...pokemons, ...data]);
          setIsFetching(false);
        });
      })
      .catch((err) => console.log(err));
  };

  const getMorePosts = () => {
    getPosts(offset, offset + 10);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 100
    ) {
      setOffset((prevOffset) => prevOffset + 10);
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("touchmove", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getPosts(offset, offset + 10);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    else getMorePosts();
  }, [isFetching]);

  const toggleModalHandler = (isSet, ...pokemonDetails) => {
    setSelectedPokemonData({
      name: pokemonDetails[0],
      imageURL: pokemonDetails[1],
      backgroundColor: pokemonDetails[2],
      abilities: pokemonDetails[3],
      stats: pokemonDetails[4],
      height: pokemonDetails[5],
      weight: pokemonDetails[6],
      types: pokemonDetails[7],
    });
    setModal(isSet);
  };

  if (searching) {
    return <Spinner />;
  }

  if (Object.keys(searchPokemonData).length !== 0) {
    let color;
    if (searchPokemonData.types.length === 2) {
      color = Gradients(
        searchPokemonData.types[0].type.name,
        searchPokemonData.types[1].type.name,
        searchPokemonData.types.length
      );
    } else {
      color = Gradients(
        searchPokemonData.types[0].type.name,
        searchPokemonData.types[0].type.name,
        searchPokemonData.types.length
      );
    }
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!modal && (
          <div className={classes.searchPokemonContainer}>
            <SearchPokemonCard
              toggleModal={toggleModalHandler}
              backgroundColor={color}
              name={searchPokemonData.name}
              pokemonImage={searchPokemonData.sprites.front_default}
              abilities={searchPokemonData.abilities}
              stats={searchPokemonData.stats}
              height={searchPokemonData.height}
              weight={searchPokemonData.weight}
              types={searchPokemonData.types}
            />
          </div>
        )}
        {modal && (
          <Modal
            toggleModal={toggleModalHandler}
            backgroundColor={color}
            name={searchPokemonData.name}
            pokemonImage={searchPokemonData.sprites.front_default}
            abilities={searchPokemonData.abilities}
            stats={searchPokemonData.stats}
            height={searchPokemonData.height}
            weight={searchPokemonData.weight}
            types={searchPokemonData.types}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {!modal && <Navbar />}
      {!modal && (
        <Search
          searchPokemon={setSearchPokemon}
          getSearchPokemon={getSearchPokemon}
        />
      )}
      {!modal && ( //if searching==false, render the pokemon container. else none
        <div className={classes.pokemonContainer}>
          {!modal &&
            pokemons.flat().map((record, i) => {
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
      )}

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

      {!modal && <Footer modal={modal} />}
    </div>
  );
};

export default PokemonLazyLoad;
