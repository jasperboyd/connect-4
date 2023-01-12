import React, {Component} from 'react';

export class NewPlayerForm extends Component {
	render() {
		return (
			<form name="newPlayerForm" className="col-md">
				<h2>Welcome New Player!</h2>
				<p> Please enter your information to start the game. </p>
				<div className="form-group">
					<label htmlFor="nickname">Nickname</label> 
					<input type="text" className="form-control"  name="nickname" />
				</div> 	
				<div className="form-group">
					<label htmlFor="age">Age</label> 
					<input type="numeric" className="form-control" name="age" />
				</div> 	
				<div className="form-group">
					<button type="submit" className="btn btn-primary">Add Player</button>
				</div>
			</form> 
		);
	} 
} 
