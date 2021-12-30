import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "../Pokemon/pokemon.module.css";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Modal from "../Modal/Modal";
import PokemonCard from "../PokemonCard/PokemonCard";
import SearchPokemonCard from "../SearchPokemonCard/SearchPokemonCard";
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
    setSearching(false);
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`)
        .then((res) => setSearchPokemonData(res.data))
        .catch(() => console.log("No matching pokemon found!"));
      setSearching(true);
    }
  };

  const getPosts = (offset, limit) => {
    axios
      .get(baseURL + `?offset=${offset}&limit=${limit}`)
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
    getPosts(offset, offset + 20);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setOffset((prevOffset) => prevOffset + 20);
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getPosts(offset, offset + 20);
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
      <div>
        {!modal && (
          <div className={classes.searchPokemonContainer}>
            {!modal && (
              <SearchPokemonCard
                toggleModal={() =>
                  toggleModalHandler(
                    true,
                    searchPokemonData.name,
                    searchPokemonData.sprites.front_default,
                    color,
                    searchPokemonData.abilities,
                    searchPokemonData.stats,
                    searchPokemonData.height,
                    searchPokemonData.weight,
                    searchPokemonData.types
                  )
                }
                types={searchPokemonData.types}
                name={searchPokemonData.name}
                image={searchPokemonData.sprites.front_default}
              />
            )}
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
      {!searching ? ( //if searching==false, render the pokemon container. else none
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
      ) : null}

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
