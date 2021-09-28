import React from 'react';
import { useContext, useState } from 'react';
import { PokemonContext } from '../../../../context/pokemonContext';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from '../Board/component/PlayerBoard';
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemonsData, cleanPokemons } from '../../../../store/pokemons';
import s from './style.module.css';
import FirebaseClass from '../../../../service/firebase';

const FinishPage = () => {
  // const firebase = useContext(FireBaseContext);
  const { pokemons, pokemons2, clearContext, win } = useContext(PokemonContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemonsRedux = useSelector(selectPokemonsData);
  const [selectedCard, setSelectedCard] = useState([]);

  if (
    Object.keys(pokemonsRedux).length === 0 &&
    Object.keys(pokemons2).length === 0
  ) {
    history.replace('/game');
  }

  const handleSelectedCard = (card) => {
    if (win === true) {
      setSelectedCard(card);
      console.log('card: ', card);
    }
  };

  const handleEndGame = () => {
    dispatch(cleanPokemons());
    if (win === true) {
      FirebaseClass.addPokemon(selectedCard);
    }
    if (selectedCard) {
      history.replace('/game');
    }
  };
  return (
    <div className={s.root}>
      <div className={s.playerCards}>
        {Object.values(pokemonsRedux).map((item) => {
          return (
            <PokemonCard
              className={s.card}
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              isActive={true}
            />
          );
        })}
      </div>
      <button className={s.button} onClick={handleEndGame}>
        End Game
      </button>
      <div className={s.playerCards}>
        <PlayerBoard
          className={s.card}
          player={2}
          cards={pokemons2}
          onClickCard={(card) => handleSelectedCard(card)}
        />
      </div>
    </div>
  );
};

export default FinishPage;
