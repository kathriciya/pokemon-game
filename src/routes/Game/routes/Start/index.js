import { useState, useEffect, useContext } from 'react';
import Layout from '../../../../components/Layout';
import PokemonCard from '../../../../components/PokemonCard';
import { useHistory } from 'react-router-dom';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemonsAsync,
  selectPokemonsData,
} from '../../../../store/pokemons';
import { getChosenPokemonsAsync } from '../../../../store/chosenPokemons';

const StartPage = () => {
  const pokemonsRedux = useSelector(selectPokemonsData);
  console.log('pokemonsRedux: ', pokemonsRedux);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
  const [chosenPokemons, setChosenPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handleChangeSelected = (key) => {
    const pokemon = { ...pokemons[key] };

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
    setChosenPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  const handleStartGameClick = () => {
    dispatch(getChosenPokemonsAsync(chosenPokemons));
    history.push('/game/board');
  };

  return (
    <>
      <Layout title="GAME" desc="Описание" colorBg="red">
        <button
          onClick={handleStartGameClick}
          disabled={Object.keys(chosenPokemons).length < 5}
          className={s.button}
        >
          Start Game
        </button>
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, img, id, type, values, selected }]) => (
              <PokemonCard
                className={s.card}
                key={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                isActive={true}
                isSelected={selected}
                onClickPokemon={() => {
                  if (Object.keys(chosenPokemons).length < 5 || selected) {
                    handleChangeSelected(key);
                  }
                }}
              />
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default StartPage;
