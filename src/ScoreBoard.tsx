import React, {Component} from 'react';
import {Game} from './Game'; 
import {Player} from './Player'; 

interface ScoreBoardProps { 
	players: Player[], 
	games: Game[] 
}

export class ScoreBoard extends Component<ScoreBoardProps> {
	state:any;

	constructor(props:any) { 
		super(props);


		this.state = { 
			players: props.players,
			games: props.games
		} 
	} 

	render() {
		return (
			<div className="container">
				<div className="row"> 
					<div className="col-md-6 player-card">
						<span className="player-color blue"></span>
						{this.state.players[0].nickname} - <span className="score">{this.state.players[0].score}</span>
					</div> 
					<div className="col-md-6 player-card">
						<span className="player-color red"></span>
						{this.state.players[1].nickname} - <span className="score">{this.state.players[1].score}</span>
					</div>
				</div>

				<div className="row">
					<div className="col">
						Winner
					</div> 
					<div className="col">
						Moves	
					</div> 
					<div className="col">
						Duration	
					</div> 
				</div>

				{ this.state.games.map(
						(g:any,i:number)=> (
								<div className="row" key={i}>
								<div className="col">{g.winner.nickname}</div>
								<div className="col">{g.moves}</div>
								<div className="col">{g.duration} Seconds</div>
								</div>
						))
				}  
			</div>
		);  
	} 
}
