import { useState, useEffect } from 'react';
import database from '../../service/firebase';
import s from './style.module.css';
import POKEMONS from '../../pokemons.js';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';

// const POKEMONS_LIST = POKEMONS.map((pokemon) => {
//   Object.assign(pokemon, { active: false });
//   return pokemon;
// });

const GamePage = () => {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      setPokemons(snapshot.val());
    });
  }, [pokemons]);

  const handleClickPokemon = (id, isActive, objID) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = true;
        }
        acc[item[0]] = pokemon;
        return acc;
      }, {});
    });
    database.ref('pokemons/' + objID).set({
      ...pokemons[objID],
      active: !isActive,
    });
  };

  const handleClickAddPokemon = () => {
    const data = POKEMONS;
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(data[0]);
  };

  return (
    <>
      <Layout title="GAME" desc="Описание" colorBg="red">
        <button onClick={handleClickAddPokemon} className={s.button}>
          ADD NEW POKEMON
        </button>
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, img, id, type, values, active }]) => (
              <PokemonCard
                key={key}
                objID={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                isActive={active}
                onClickPokemon={handleClickPokemon}
              />
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
