import React, {Component} from 'react';
import {GameOverPopup} from './GameOverPopup';

interface GameBoardProps { 
	game: any; 
	setGameWinner: (winnerIndex:number, moves:number, destination:string)=>void;
	modalShow: any;
	setModalShow: any;
}


export class GameBoard extends Component<GameBoardProps> {
	modalShow:any; 
	maxMoves:number = 42; 

	game:any; 
	players: any;
	setGameWinner: (winnerIndex:number, moves:number, destination:string)=>void;

	state:any;

	constructor(props:any) { 
		super(props);

		this.modalShow = props.modalShow; 

		this.makeSelection = this.makeSelection.bind(this); 
		this.setGameWinner = props.setGameWinner; 

		this.players = [...props.game.players];

		this.state = { 
			game: props.game,
			currentPlayerIndex: props.game.startingPlayerIndex, 
			score: {
				moves: 0
			} 
		}

		console.log(this.state);
	} 

	makeSelection(index: number){ 
		let gameWon = this.state.game.board.makeSelection(index, this.state.currentPlayerIndex); 
		
		this.setState({game:{board: this.state.game.board}}); 

		if(!gameWon) return this.nextTurn();

		this.modalShow=true; 
	}

	nextTurn(){
		if(this.state.score.moves+1 === this.maxMoves){ 
			this.setState({currentPlayerIndex:-1}); 
			this.modalShow=true; 
		} else { 
			this.setState({score:{moves:this.state.score.moves+1},currentPlayerIndex:this.state.currentPlayerIndex === 1 ? 0 : 1}); 
		}	
	}	

	render(){
		return (
			<div>
				<div className="row"> 
					<div className={`col-md-6 player-card ${this.state.currentPlayerIndex === 0 ? 'playing' : ''}`}>
						<span className="player-color blue"></span>
						{this.players[0].nickname}
					</div> 
					<div className={`col-md-6 player-card ${this.state.currentPlayerIndex === 1 ? 'playing' : ''}`}>
						<span className="player-color red"></span>
						{this.players[1].nickname} 
					</div> 
				</div>				
				<div className="container gameboard"> 
					<div className="row">
						{ this.state.game.board.board[0].map( (c:number, i:number) => (
							<div className="col" key={i}>
								<button onClick={() => this.makeSelection(i)} className={`btn btn-primary ${this.state.currentPlayerIndex === 0 ? 'blue' :'red'} ${c !== -1 ? 'hide' : ''}`} value={i}>Drop Here</button>
							</div>
						))}
					</div> 
					{ this.state.game.board.board.map( (r:any, ri:number) => (
						<div className="row" key={ri}>
						{ r.map( (c:any, i:number) => (<div className="col" key={i}><span className={`board-space ${c===0 ? 'blue' :''} ${c===1 ? 'red' : ''}`}></span></div>))}
						</div>

					))}

					{ this.modalShow ? (
					<GameOverPopup currentPlayerIndex={this.state.currentPlayerIndex} 
						moves={this.state.score.moves} 
						setGameWinner={this.setGameWinner} 
						players={this.players} 
						show={this.modalShow} 
					/>  ) : '' }
				</div>
			</div>
		);
	} 
} 
