import React, {useState} from 'react';
import { GameSetupForm } from './GameSetupForm';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
	const [modalShow, setModalShow] = useState(false);

  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <h1>
			Connect 4
        </h1>
      </header>
	  <div className="row">
		<GameSetupForm modalShow={modalShow} setModalShow={setModalShow} />
	  </div>
    </div>
  );
}

export default App;
