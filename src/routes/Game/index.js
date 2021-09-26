import { useState } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [player2Context, setPlayer2Context] = useState([]);
  const [winContext, setWinContext] = useState(false);
  const match = useRouteMatch();
  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
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

  const handleClearContext = () => {
    setSelectedPokemons({});
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        pokemons2: player2Context,
        setPlayer2Context: setPlayer2Context,
        onSelectedPokemons: handleSelectedPokemons,
        clearContext: handleClearContext,
        win: winContext,
        setWin: setWinContext,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};
export default GamePage;
