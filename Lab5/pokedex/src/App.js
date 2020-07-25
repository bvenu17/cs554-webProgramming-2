import React from 'react';
import './App.css';
import PokemonInfo from './components/PokemonInfo';
import PokemonPage from './components/PokemonPage';
import BerryPage from './components/BerryPage';
import MachinePage from './components/MachinePage';
import MachineInfo from './components/MachineInfo';
import Error from './components/Error';
import IndexPage from './components/IndexPage';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Link ,Route, Switch,  BrowserRouter as Router } from 'react-router-dom'

import BerryInfo from './components/BerryInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <a href="/">
            <img className="App-logo" alt="logo" src="https://fontmeme.com/permalink/200327/e133f5ffb61b822577329b6b9de59e5e.png" />
          </a>
          <br></br>
          <Link className="showlink" to="/pokemon/page/0">Pokemons</Link>
          <Link className="showlink" to="/berries/page/0">Berries</Link>
          <Link className="showlink" to="/machine/page/0">Machines</Link>
        </div>
        {/* <div className="intro">
          <p>All the Pokémon data you'll ever need in one place! Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon.</p>
          
        </div> */}

    <Switch>
        <Route path="/"  exact component={IndexPage}  />

        <Route path='/pokemon/page/:page' exact component={PokemonPage} />
        <Route path='/pokemon/:id' exact component={PokemonInfo} />
        <Route path='/berries/page/:page' exact component={BerryPage} />
        <Route path='/berries/:id' exact component={BerryInfo} />
        <Route path='/machine/page/:page' exact component={MachinePage} />
        <Route path='/machine/:id' exact component={MachineInfo} />
        <Route path='*' exact component={Error} status={404} />

        </Switch>

      </div>
    </Router>
  );
}

export default App;
