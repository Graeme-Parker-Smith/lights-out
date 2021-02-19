import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);

  }

  createBoard() {
    let {ncols, nrows, chanceLightStartsOn} = this.props;
    function chanceLit(){
      let arr = [];
      for(let i = 0; i < ncols; i++){
        arr.push(Math.random() < chanceLightStartsOn)
      }
      return arr;
    }
    let board = [];
    for(let i = 0; i < nrows; i++){
      board.push(chanceLit())
    }
   
    return board
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
        if(y > 0) board[y-1][x] = !board[y-1][x];
        if(y < 4) board[y+1][x] = !board[y+1][x];
        if(x > 0) board[y][x-1] = !board[y][x-1];
        if(x < 4) board[y][x+1] = !board[y][x+1];
      }
    }
    
    flipCell(y, x);
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
    
  }

  render() {
    let board = this.state.board;
    let rows = board.map((arr, row) => {
        return <tr key={row}>
          {arr.map((boolVal, col) => {
            return <Cell 
            key={`${row}-${col}`} 
            coord={`${row}-${col}`} 
            isLit={boolVal} 
            flipCellsAroundMe={this.flipCellsAround} 
            />
          })}
        </tr>
    });
    let unfinishedGame = (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
            <tbody>
                {rows}
            </tbody>
        </table>
      </div>
    );
  let finishedGame = (<h1>CONGRATULATIONS! YOU WON!</h1>)
      return (
        this.state.hasWon ? finishedGame : unfinishedGame
      );
  }
}


export default Board;
