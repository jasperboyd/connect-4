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
				<div className="col-md-6">
			{this.state.players[0].nickname} - {this.state.players[0].score}
				</div> 
				<div className="col-md-6">
					{this.state.players[1].nickname} - {this.state.players[1].score}
				</div> 
			</div> 
		);  
	} 
}
