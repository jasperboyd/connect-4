import React, {Component} from 'react';

interface NewPlayerFormProps { 
	player: any
	number: number
	savePlayer: (player:any, index:number) => void
} 

export class NewPlayerForm extends Component<NewPlayerFormProps> {
	playerData:any; 
	state:any;
	savePlayer: (player:any, index:number) => void

	constructor(props:NewPlayerFormProps) { 
		super(props); 

		this.savePlayer = props.savePlayer; 

		this.render = this.render.bind(this);
		this.callSavePlayer = this.callSavePlayer.bind(this);
		this.onChangeNickname = this.onChangeNickname.bind(this);
		this.onChangeAge = this.onChangeAge.bind(this);
		
		this.state = props.player; 
		this.state.number = props.number;
	} 

	onChangeNickname(e:any) { 
		this.setState({ nickname: e.target.value }); 
	} 

	onChangeAge(e:any) { 
		this.setState({ age: e.target.value }); 
	}

	callSavePlayer(e:any) { 
		e.preventDefault(); 
		this.savePlayer(this.state, this.state.number-1);
		this.setState({ saved: true }); 
	} 

	// React Life Cycle
	/*
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
		//localStorage.setItem('player', JSON.stringify(nextState));
		this.savePlayer(nextState, this.state.number-1); 
	}
	*/

	render() {
		if(this.state.saved){ 
			return (
				<div> 
					<h2>Player {this.state.number}</h2>
				<h3>{this.state.nickname}</h3>
				<h4>{this.state.age} years old</h4> 
				</div>
			);
		} else { 
			return (

					<div>
						<h2>Player {this.state.number}</h2>

						<div className="form-group">
							<label htmlFor="nickname">Nickname</label> 
							<input type="text" value={this.state.nickname} onChange={this.onChangeNickname} className="form-control"  name="nickname" />
							<label htmlFor="age">Age</label> 
							<input type="numeric" value={this.state.age} onChange={this.onChangeAge} className="form-control" name="age" />
						</div> 	
						<div className="form-group">
							<button onClick={this.callSavePlayer} className="btn btn-primary">Add Player</button>
						</div>	
					</div>
		);
		}
	}
} 
