import React from 'react';
import { NewPlayerForm } from './NewPlayerForm';

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
		<NewPlayerForm />
	  </div>
    </div>
  );
}

export default App;
