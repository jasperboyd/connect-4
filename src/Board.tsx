export class Board  {
	moves:number = 0;
	maxMoves:number = 42;
	board:any;

	constructor(){ 
		this.board = [
			[-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1]
		];
	}

	makeSelection(index:number, playerIndex:number){ 
		if(this.moves >= this.maxMoves){ 
			return false; 
		} 

		let gameWon = false;
		for(var i=this.board.length-1; i>=0; i--){ 
			if(this.board[i][index] === -1){ 
				this.board[i][index] = playerIndex;
				this.moves++;
				gameWon = this.determineWin(i, index, playerIndex);
				break;
			} 
		}
		return gameWon; 
	} 

	checkVerticalWin(row: number, column:number, playerIndex:number){ 

		let maxSegment = 0; 

		for(var i=this.board.length-1; i>=0; i--){
			if(this.board[i][column] === playerIndex){ 
				maxSegment++;
			} else {
				maxSegment = 0; 
			} 

			if(maxSegment === 4) return true;
	
		}
		return false; 
	} 

	checkHorizontalWin(row:number, column:number, playerIndex:number){ 
		let maxSegment = 0; 
		for(var i=0; i<this.board[row].length; i++){
			if(this.board[row][i] === playerIndex){ 
				maxSegment++; 
			} else {
				maxSegment = 0; 
			}

			if(maxSegment===4) return true;
				
		} 
		return false; 
	} 

	checkDiagonalWin(row:number, column:number, playerIndex:number){ 
		//determine start 1, look begining at bottom left of diagonal
		console.log(row, column);

		let startPositionRow = row, startPositionColumn = column; 

		while(startPositionRow !== this.board.length - 1 && startPositionColumn !== 0){ 
			startPositionRow++;
			startPositionColumn--;
		} 

		let maxSegment = 0; 

		console.log('diag1', startPositionRow, startPositionColumn); 

		while(startPositionRow >= 0 && startPositionColumn < this.board[0].length ){ 

			console.log('diag1 check', startPositionRow, startPositionColumn, this.board[startPositionRow][startPositionColumn]);

			if(this.board[startPositionRow][startPositionColumn] === playerIndex){ 
				maxSegment++; 
			} else { 
				maxSegment = 0; 
			}

			if(maxSegment === 4) return true; 

			startPositionRow--;
			startPositionColumn++;
		} 


		//determine start 2, look begining at bottom right of diagonal
		startPositionRow = row; 
		startPositionColumn = column; 
		
		while(startPositionRow !== this.board.length - 1 && startPositionColumn < this.board[0].length-1){ 
			startPositionRow++;
			startPositionColumn++;
		} 
		
		console.log('diag2', startPositionRow, startPositionColumn); 

		maxSegment = 0; 

		while(startPositionRow >= 0 && startPositionColumn >= 0){ 
			
			console.log('diag2 check', startPositionRow, startPositionColumn, this.board[startPositionRow][startPositionColumn]);
			
			if(this.board[startPositionRow][startPositionColumn] === playerIndex){ 
				maxSegment++; 
			} else { 
				maxSegment = 0; 
			}
	
			if(maxSegment === 4) return true; 

			startPositionRow--;
			startPositionColumn--;
		}	
		return false; 
	} 

	determineWin(row:number, column:number, playerIndex:number){ 
		let verticalWin = this.checkVerticalWin(row, column, playerIndex);

		if(verticalWin) return true;

		let horizontalWin = this.checkHorizontalWin(row, column, playerIndex); 

		if(horizontalWin) return true; 
	
		let diagonalWin = this.checkDiagonalWin(row, column, playerIndex); 

		if(diagonalWin) return true; 

		return false;
	} 
}  
