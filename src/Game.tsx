import { Player } from './Player';
import { Board } from './Board';

export type Game = {
	players: Player[],
	board: Board,	
	score: {
		player1: { 
			player: Player, 
			score: number 
		},
		player2: {
			player: Player
			score: number
		},
		moves: number,
		stalemate: boolean,
		startTime: Date 
		endTime: Date 
	} 
}  
