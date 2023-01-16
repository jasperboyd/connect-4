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
		);  
	} 
}
