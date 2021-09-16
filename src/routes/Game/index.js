import { useState } from 'react';
import s from './style.module.css';
import POKEMONS from '../../pokemons.js';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';

const POKEMONS_LIST = POKEMONS.map((pokemon) => {
  Object.assign(pokemon, { active: false });
  return pokemon;
});

const GamePage = () => {
  const [pokemons, setPokemons] = useState(POKEMONS_LIST);

  const handleClickPokemon = (id) => {
    setPokemons(
      POKEMONS_LIST.map((item) => {
        if (item.id === id) {
          item.active = !item.active;
        }
        return item;
      })
    );
  };

  return (
    <>
      <Layout title="GAME" desc="Описание" colorBg="red">
        <div className={s.flex}>
          {pokemons.map((item) => (
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              isActive={item.active}
              onClickPokemon={handleClickPokemon}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
