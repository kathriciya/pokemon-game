import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import PlayerBoard from './component/PlayerBoard';
import { useDispatch, useSelector } from 'react-redux';
// import { selectChosenPokemonsData } from '../../../../store/chosenPokemons';
// import { getEnemyAsync } from '../../../../store/enemy';
// import { setWin } from '../../../../store/pokemons';
import request from '../../../../service/request';
import { selectPlayer1, setPlayer2 } from '../../../../store/game';
import { selectPokemonsData } from '../../../../store/pokemons';

// const counterWin = (board, player1, player2) => {
//   let player1Count = player1.length;
//   let player2Count = player2.length;

//   board.forEach((item) => {
//     if (item.card.possession === 'red') {
//       player2Count++;
//     }
//     if (item.card.possession === 'blue') {
//       player1Count++;
//     }
//   });
//   return [player1Count, player2Count];
// };

const BoardPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const chosenPokemons = useSelector(selectChosenPokemonsData);
  const [board, setBoard] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [startSide, setStartSide] = useState(0);
  const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const player1Selector = useSelector(selectPlayer1);
  const pokemonsSelector = useSelector(selectPokemonsData);

  if (Object.keys(player1Selector).length === 0) {
    history.replace('/game');
  }

  const [player1, setPlayer1State] = useState(() => {
    return Object.values(player1Selector).map((item) => ({
      ...item,
      possession: 'blue',
    }));
  });

  const [player2, setPlayer2State] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const boardRequest = await request.getBoard();
      setBoard(boardRequest.data);

      const player2Request = await request.gameStart({
        pokemons: Object.values(pokemonsSelector),
      });

      console.log('player2Request: ', player2Request);

      setTimeout(() => {
        setStartSide(1);
      }, 2000);

      dispatch(setPlayer2(player2Request.data));
      setPlayer2State(() =>
        player2Request.data.map((item) => ({
          ...item,
          possession: 'red',
        }))
      );
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const boardResponse = await fetch(
  //       'https://reactmarathon-api.netlify.app/api/board'
  //     );
  //     const boardRequest = await boardResponse.json();
  //     setBoard(boardRequest.data);
  //     const player2Response = await fetch(
  //       'https://reactmarathon-api.netlify.app/api/create-player'
  //     );
  //     const player2Request = await player2Response.json();
  //     setPlayer2(() => {
  //       return player2Request.data.map((item) => ({
  //         ...item,
  //         possession: 'red',
  //       }));
  //     });
  //     dispatch(getEnemyAsync(player2Request.data));
  //   };
  //   fetchData();
  // }, []);

  // const handleClickBoardPlate = async (position) => {
  //   if (choiceCard) {
  //     const params = {
  //       position,
  //       card: choiceCard,
  //       board,
  //     };

  //     const res = await fetch(
  //       'https://reactmarathon-api.netlify.app/api/players-turn',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(params),
  //       }
  //     );

  //     const request = await res.json();
  //     // console.log('request: ', request);

  //     if (choiceCard.player === 1) {
  //       setPlayer1((prevState) =>
  //         prevState.filter((item) => item.id !== choiceCard.id)
  //       );
  //     }
  //     if (choiceCard.player === 2) {
  //       setPlayer2((prevState) =>
  //         prevState.filter((item) => item.id !== choiceCard.id)
  //       );
  //     }
  //     setBoard(request.data);
  //     setSteps((prevState) => {
  //       const count = prevState + 1;
  //       return count;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (steps === 9) {
  //     const [count1, count2] = counterWin(board, player1, player2);

  //     if (count1 > count2) {
  //       alert('WIN');
  //       dispatch(setWin());
  //     } else if (count1 < count2) {
  //       alert('LOSE');
  //     } else {
  //       alert('DRAW');
  //     }
  //     history.replace('/game/finish');
  //   }
  // }, [steps]);

  const handleClickBoardPlate = async (position) => {
    if (typeof choiceCard === 'object') {
      const params = {
        currentPlayer: 'p1',
        hands: {
          p1: player1,
          p2: player2,
        },
        move: {
          poke: {
            ...choiceCard,
          },
          position,
        },
        board: serverBoard,
      };
      if (choiceCard.player === 1) {
        setPlayer1State((prevState) =>
          prevState.filter((item) => item.id !== choiceCard.id)
        );
      }

      setBoard((prevState) =>
        prevState.map((item) => {
          if (item.position === position) {
            return {
              ...item,
              card: choiceCard,
            };
          }
          return item;
        })
      );
      const game = await request.game(params);
      console.log('game: ', game);

      setSteps((prevState) => {
        const count = prevState + 1;
        return count;
      });

      if (game.move !== null) {
        const idAi = game.move.poke.id;
        setPlayer2State((prevState) =>
          prevState.map((item) => {
            if (item.id === idAi) {
              return {
                ...item,
                selected: true,
              };
            }
            return item;
          })
        );
      }
    }
  };

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => setChoiceCard(card)}
        />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div
            key={item.position}
            className={s.boardPlate}
            onClick={() => !item.card && handleClickBoardPlate(item.position)}
          >
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => setChoiceCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
