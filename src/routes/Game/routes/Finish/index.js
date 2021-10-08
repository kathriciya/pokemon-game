import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from '../Board/component/PlayerBoard';
import s from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectChosenPokemonsData } from '../../../../store/chosenPokemons';
import { selectEnemyData } from '../../../../store/enemy';
import { cleanPokemons, win } from '../../../../store/pokemons';
// import { cleanEnemy } from '../../../../store/enemy';
import FirebaseClass from '../../../../service/firebase';
import { selectLocalID } from '../../../../store/user';

const FinishPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemons = useSelector(selectChosenPokemonsData);
  console.log('pokemons: ', pokemons);
  const pokemons2 = useSelector(selectEnemyData);
  console.log('pokemons2 : ', pokemons2);
  const winner = useSelector(win);
  const localId = useSelector(selectLocalID);

  const [selectedCard, setSelectedCard] = useState([]);

  if (
    Object.keys(pokemons).length === 0 &&
    Object.keys(pokemons2).length === 0
  ) {
    history.replace('/game');
  }

  const handleSelectedCard = (card) => {
    if (winner) {
      setSelectedCard(card);
      console.log('card: ', card);
    }
  };

  const handleEndGame = () => {
    dispatch(cleanPokemons());
    if (winner) {
      FirebaseClass.addPokemon(selectedCard, localId);
    }
    if (selectedCard) {
      history.replace('/game');
    }
  };
  return (
    <div className={s.root}>
      <div className={s.playerCards}>
        {Object.values(pokemons).map((item) => {
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
