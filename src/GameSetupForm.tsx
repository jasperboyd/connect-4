import React, {Component} from 'react';
import {Board} from './Board';
import {GameBoard} from './GameBoard';
import {NewPlayerForm} from './NewPlayerForm';
import {ScoreBoard} from './ScoreBoard';

export class GameSetupForm extends Component {
	gameData:any; 
	state:any;

	constructor(props:any) { 
		super(props); 

		this.savePlayer = this.savePlayer.bind(this); 
		this.setGameWinner = this.setGameWinner.bind(this); 
		this.startGame = this.startGame.bind(this); 
		//this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			currentGame: null,
			players: [
				{ 
					nickname: '',
					age: '',
					score: 0,
					saved: false
				},
				{ 
					nickname: '',
					age: '',
					score: 0, 
					saved: false
				}
			],
			games: [],
			allPlayersSaved: false
		};
	}

	savePlayer(player:any, index:number){ 
		let state = {...this.state}; 
		state.players[index] = player; 
		state.players[index].saved = true; 
		localStorage.setItem('appState', JSON.stringify(state));

		if(state.players[0].saved && state.players[1].saved){ 
			this.setState({allPlayersSaved: true}); 
		} 
	}

	setGameWinner(playerIndex:number, moves:number){ 
		console.log('winner', playerIndex);
		let state = {...this.state}; 

		let currentGame = {...this.state.currentGame}

		currentGame.endTime = new Date();
		currentGame.moves = moves; 

		state.games[0] = currentGame; 
		state.currentGame = null;

		state.players[playerIndex].score = state.players[playerIndex].score ? state.players[playerIndex].score++ : 1;  

		this.setState(state); 
	} 

	startGame(){
		console.log('starting a new game');
		let game = {
			board: new Board(),
			moves: 0,
			stalemate: false,
			startTime: new Date(),
			endTime: null
		}

		let games = [...this.state.games]; 

		games.push(game); 

		this.setState({games: games, currentGame: game}); 
	} 
		
	componentDidMount() {
		let appStateString =  localStorage.getItem('appState') || '';
		if(!appStateString.length) return;
		let appState = JSON.parse( appStateString );
		if (localStorage && appState) {
			appState.allPlayersSaved = appState.players[0].saved && appState.players[1].saved 

			this.setState(appState);
		}
	}

	render() { 
		if(!this.state.allPlayersSaved){
			return (
				<form name="Game Setup Form">
				
				<h2>Welcome New Players!</h2>
				<p> Please enter your information to start the game. </p>

				{ this.state.players.map( (p:any, i:any) => (<NewPlayerForm key={i} player={p} number={i+1} savePlayer={this.savePlayer} />)) }

				</form> 
			); 
		} else if (this.state.currentGame == null) { 
			return (
				<div>
					<ScoreBoard players={this.state.players} games={this.state.games} />

					<h1>Ready?</h1> 
					<div className="player-one-score">
						<button onClick={this.startGame} className="btn btn-primary">Start Game</button>
					</div>
				</div> 
			); 
		} else { 
			return (
				<div> 
					<ScoreBoard players={this.state.players} games={this.state.games} />
					<GameBoard game={this.state.currentGame} setGameWinner={this.setGameWinner} />
				</div> 	
			); 
		} 
	} 
}
