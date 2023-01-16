import React from 'react';
import { GameSetupForm } from './GameSetupForm';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <h1>
			Connect 4
        </h1>
      </header>
	  <div className="row">
		<GameSetupForm />
	  </div>
    </div>
  );
}

export default App;
