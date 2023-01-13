import React, {Component} from 'react';

export class NewPlayerForm extends Component {
	playerData:any; 
	state:any;

	constructor(props:any) { 
		super(props); 

		this.onChangeNickname = this.onChangeNickname.bind(this);
		this.onChangeAge = this.onChangeAge.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = { 
			'nickname': '',
			'age': ''
		}  
	} 

	onChangeNickname(e:any) { 
		this.setState({ nickname: e.target.value }); 
	} 

	onChangeAge(e:any) { 
		this.setState({ age: e.target.value }); 
	}

	onSubmit(e:any) { 
		e.preventDefault(); 

		this.setState({
			nickname: '', 
			age: ''
		}); 
	} 

	// React Life Cycle
    componentDidMount() {
		this.playerData = JSON.parse(localStorage.getItem('player') || "{name:'',age''}");
        if (localStorage.getItem('player')) {
            this.setState({
                nickname: this.playerData.nickname,
                age: this.playerData.age,
            })
        } else {
            this.setState({
                nickname: '',
                age: ''
            })
        }
    }

	componentDidUpdate(nextProps:any, nextState:any) {
		console.log('componentUpdate', nextProps, nextState); 
        localStorage.setItem('player', JSON.stringify(nextState));
    } 

	render() {
		return (
			<form onSubmit={this.onSubmit} name="newPlayerForm" className="col-md">
				<h2>Welcome New Player!</h2>
				<p> Please enter your information to start the game. </p>
				<div className="form-group">
					<label htmlFor="nickname">Nickname</label> 
					<input type="text" value={this.state.nickname} onChange={this.onChangeNickname} className="form-control"  name="nickname" />
				</div> 	
				<div className="form-group">
					<label htmlFor="age">Age</label> 
					<input type="numeric" value={this.state.age} onChange={this.onChangeAge} className="form-control" name="age" />
				</div> 	
				<div className="form-group">
					<button type="submit" className="btn btn-primary">Add Player</button>
				</div>
			</form> 
		);
	} 
} 
