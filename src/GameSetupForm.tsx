import React, {Component} from 'react';
import {Board} from './Board';
import {GameBoard} from './GameBoard';
import {NewPlayerForm} from './NewPlayerForm';
import {ScoreBoard} from './ScoreBoard';

interface GameSetupFormProps {
	modalShow:any; 
	setModalShow:any;
} 

export class GameSetupForm extends Component<GameSetupFormProps> {
	gameData:any; 
	state:any;
	showScoreBoard:boolean=false; 
	modalShow:any; 
	setModalShow:any;

	constructor(props:any) { 
		super(props); 

		this.modalShow = props.modalShow; 
		this.setModalShow = props.setModalShow; 

		this.goToScoreBoard = this.goToScoreBoard.bind(this); 
		this.savePlayer = this.savePlayer.bind(this); 
		this.setGameWinner = this.setGameWinner.bind(this); 
		this.startGame = this.startGame.bind(this); 

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

	setGameWinner(playerIndex:number, moves:number, destination:string){ 
		let state = {...this.state}; 

		let currentGame = {...this.state.currentGame}

		currentGame.endTime = new Date();
		currentGame.moves = moves; 
		
		if(playerIndex > -1){ 
			currentGame.winner = state.players[playerIndex];  
			state.players[playerIndex].score++;  
		} else { 
			currentGame.winner = null; 
			currentGame.stalemate = true; 
		}

		currentGame.durationSeconds = Math.floor((currentGame.endTime.getTime() - currentGame.startTime.getTime()) / 1000);
		
		currentGame.durationMinutes = Math.floor(currentGame.durationSeconds / 60);

		currentGame.durationSeconds -= currentGame.durationMinutes * 60

		state.games[0] = currentGame; 
		state.currentGame = null;


		this.setState(state); 
		localStorage.setItem('appState', JSON.stringify(state));

		if(destination === 'new') this.startGame();

		if(destination === 'scoreboard') this.goToScoreBoard(); 
	} 

	startGame(){
		this.showScoreBoard = false; 
		
		let games = [...this.state.games]; 

		let startingPlayerIndex = Math.floor(Math.random() * 2) 
		if(games.length !== 0){ 
		
			startingPlayerIndex = games[0].startingPlayerIndex === 0 ? 1 : 0;
		} 

		let game = {
			key: this.state.games.length + 1, 
			board: new Board(),
			players: [...this.state.players],
			moves: 0,
			stalemate: false,
			startingPlayerIndex: startingPlayerIndex,
			startTime: new Date(),
			endTime: null
		}


		games.unshift(game); 

		this.setState({games: games, currentGame: game}); 
		
		this.modalShow=false; 
	} 

	goToScoreBoard() {
		this.showScoreBoard=true;
		this.setState({});//force redraw 
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
				<form name="GameSetupForm">
				
				<h2>Welcome New Players!</h2>
				<p> Please enter your information to start the game. </p>

				<div className="row">
					{ this.state.players.map( (p:any, i:any) => (<NewPlayerForm key={i} player={p} number={i+1} savePlayer={this.savePlayer} />)) }
				</div>

				</form> 
			); 
		} else if(this.showScoreBoard) {
			return (
				<div>
					<ScoreBoard players={this.state.players} games={this.state.games} />
					<button onClick={this.startGame} className="btn btn-primary">Start Game</button>
				</div>		
			);	
		} else if (this.state.currentGame == null && !this.showScoreBoard) { 
			return (
				<div>

					<h1>Ready?</h1> 
					<div>
						<button onClick={this.goToScoreBoard} className="btn">Go To Scoreboard</button>
						<button onClick={this.startGame} className="btn btn-primary">Start Game</button>
					</div>
				</div> 
			); 
		} else { 
			return (
				<div> 
				<GameBoard key={this.state.currentGame.key} 
					game={this.state.currentGame} 
					setGameWinner={this.setGameWinner} 
					modalShow={this.modalShow} 
					setModalShow={this.setModalShow} />
				</div> 	
			); 
		} 
	} 
}
