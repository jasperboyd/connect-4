import React, {Component} from 'react';

interface GameBoardProps { 
	game: any; 
	setGameWinner: (winnerIndex:number, moves:number)=>void;
}

export class GameBoard extends Component<GameBoardProps> {
	game:any; 
	players: any;
	setGameWinner: (winnerIndex:number, moves:number)=>void;

	state:any;

	constructor(props:any) { 
		super(props);

		this.makeSelection = this.makeSelection.bind(this); 
		this.setGameWinner = props.setGameWinner; 

		this.players = [...props.game.players];

		this.state = { 
			game: props.game,
			currentPlayerIndex: Math.floor(Math.random() * 2), 
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

		this.setGameWinner(this.state.currentPlayerIndex, this.state.moves);
	} 

	nextTurn(){
		this.setState({score:{moves:this.state.score.moves+1},currentPlayerIndex:this.state.currentPlayerIndex === 1 ? 0 : 1}); 
	} 

	render(){
		return (
			<div>
				<div className="row"> 
					<div className="col-md-6 player-card">
						<span className="player-color blue"></span>
						{this.players[0].nickname}
					</div> 
					<div className="col-md-6 player-card">
						<span className="player-color red"></span>
						{this.players[1].nickname} 
					</div> 
				</div>				
				<div className="scoreboard">
					<h1>Moves: {this.state.score.moves}</h1>
				</div>
				<div className="container gameboard"> 
					<div className="row">
						{ this.state.game.board.board[0].map( (c:number, i:number) => (
							<div className="col" key={i}>
								<button onClick={() => this.makeSelection(i)} className={`btn btn-primary ${c !== -1 ? 'hide' : ''}`} value={i}>Drop Here</button>
							</div>
						))}
					</div> 
					{ this.state.game.board.board.map( (r:any, ri:number) => (
						<div className="row" key={ri}>
						{ r.map( (c:any, i:number) => (<div className="col" key={i}><span className={`board-space ${c===0 ? 'blue' :''} ${c===1 ? 'red' : ''}`}></span></div>))}
						</div>

					))}
				</div>
			</div>
		);
	} 
} 
