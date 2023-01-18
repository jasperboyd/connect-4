import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface GameOverPopupProps { 
	show: boolean;
	players: any[];
	currentPlayerIndex:number; 
	moves:number;
	setGameWinner:any; 
}

export class GameOverPopup extends Component<GameOverPopupProps> {

	state: any; 
	props:GameOverPopupProps;
	setGameWinner:any; 

	constructor(props:any){ 
		super(props); 
		this.props = props;
		this.state = {
			show: this.props.show
		} 
		this.setGameWinner = props.setGameWinner; 
	}
	
	handleClose(){
		this.setState({show: false}); 
	} 

	render(){ 
		return (
		<Modal
			show={this.state.show} 
			aria-labelledby="contained-modal-title-vcenter"
			centered
			>	
				<Modal.Header closeButton>
					<Modal.Title>Game Over</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>{ this.props.currentPlayerIndex > -1 ? this.props.players[this.props.currentPlayerIndex].nickname + ' is the winner!' : 'The game has ended in stalemate!'} </p>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={() => { 
							this.setGameWinner(this.props.currentPlayerIndex, this.props.moves, 'scoreboard'); 
							this.handleClose(); 
						}} 
						variant="secondary">
						Go to scoreboard
					</Button>
					<Button onClick={() => {
							this.setGameWinner(this.props.currentPlayerIndex, this.props.moves, 'new');
							this.handleClose(); 
						}} 
						variant="primary">
						Start a new game
					</Button>
					</Modal.Footer>
			</Modal>
	); 

	} 
}
