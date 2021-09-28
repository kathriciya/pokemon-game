import { useState, useEffect, useContext } from 'react';
// import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import Layout from '../../../../components/Layout';
import PokemonCard from '../../../../components/PokemonCard';
import { useHistory } from 'react-router-dom';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemonsAsync,
  selectPokemonsData,
  selectPokemonsLoading,
} from '../../../../store/pokemons';

const StartPage = () => {
  // const firebase = useContext(FireBaseContext);
  // const isLoading = useSelector(selectPokemonsLoading);
  const pokemonsContext = useContext(PokemonContext);
  // const selectedPokemonsRadux = useSelector(selectedPokemons);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handleChangeSelected = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemons(key, pokemon);

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handleStartGameClick = () => {
    history.push('/game/board');
  };

  return (
    <>
      <Layout title="GAME" desc="Описание" colorBg="red">
        <button
          onClick={handleStartGameClick}
          disabled={Object.keys(pokemonsRedux).length < 5}
          className={s.button}
        >
          Start Game
        </button>
        <div className={s.flex}>
          {Object.entries(pokemonsRedux).map(
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
                  if (Object.keys(pokemonsRedux).length < 5 || selected) {
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
