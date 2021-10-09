import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import PokemonCard from '../../../../components/PokemonCard';
import { useHistory } from 'react-router-dom';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemonsAsync,
  selectPokemonsData,
  // selectPokemonsLoading,
} from '../../../../store/pokemons';
// import { getChosenPokemonsAsync } from '../../../../store/chosenPokemons';
import {
  setPlayer1,
  selectPlayer1,
  setPlayer2,
  setResult,
} from '../../../../store/game';

const selectedPokemonsUtils = (selectedPokemons, key, pokemon) => {
  if (selectedPokemons[key]) {
    const copyState = { ...selectedPokemons };
    delete copyState[key];
    return copyState;
  }
  return {
    ...selectedPokemons,
    [key]: pokemon,
  };
};

const StartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
  // const isLoading = useSelector(selectPokemonsLoading);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemons = useSelector(selectPlayer1);

  // const [chosenPokemons, setChosenPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
    dispatch(setPlayer1({}));
    dispatch(setPlayer2([]));
    dispatch(setResult(null));
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handleStartGameClick = () => {
    // dispatch(getChosenPokemonsAsync(chosenPokemons));
    history.push('/game/board');
  };

  const handleChangeSelected = (key) => {
    const pokemon = { ...pokemons[key] };
    dispatch(setPlayer1(selectedPokemonsUtils(selectedPokemons, key, pokemon)));

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
    // setChosenPokemons((prevState) => {
    //   if (prevState[key]) {
    //     const copyState = { ...prevState };
    //     delete copyState[key];
    //     return copyState;
    //   }
    //   return {
    //     ...prevState,
    //     [key]: pokemon,
    //   };
    // });
  };

  const handleCliclCard = (key, selected) => {
    if (Object.keys(selectedPokemons).length < 5 || selected) {
      handleChangeSelected(key);
    }
  };

  return (
    <>
      <Layout title="GAME" desc="Описание" colorBg="red">
        <button
          onClick={handleStartGameClick}
          disabled={Object.keys(selectedPokemons).length < 5}
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
                onClickPokemon={() => handleCliclCard(key, selected)}
              />
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default StartPage;
