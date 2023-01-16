import React, {Component} from 'react';

interface GameBoardProps { 
	game: any; 
}

export class GameBoard extends Component<GameBoardProps> {
	game:any; 
	state:any;

	constructor(props:any) { 
		super(props);

		this.state = { 
			game: props.game
		} 
	} 

	render(){
		return (
			<div className="container gameboard"> 
				{ this.state.game.board.map( (r:any) => (
					<div className="row">
						{ r.map( (c:any) => (<div className="col">{c}</div>))}
					</div>

				))}
			</div>
		);
	} 
} 
