import React from 'react'
import Square from './Square'
export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: []
    }
    this.resetGame = this.resetGame.bind(this)
  }

  renderSquare (i, k) {
    return <Square value={ i } key={ k } onClick={ () => this.handleClick(k) } />
  }

  handleClick(i) {
    if (this.isWin() == null || this.isDraw) {
      let grid = this.state.squares
      let isNext = this.state.squares[i] == null ? !this.state.xIsNext : this.state.xIsNext
      let history = this.state.history
      grid[i] = this.state.squares[i] == null ? (this.state.xIsNext ? "O" : " X") : this.state.squares[i]
      history.push(`player: ${this.state.xIsNext ? "O" : " X"} played on row : ${i}`)
      this.setState({ squares: grid, xIsNext: isNext })
    }
  }

  isWin () {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.state.squares[a] && this.state.squares[a] === this.state.squares[b] && this.state.squares[a] === this.state.squares[c]) {
        return this.state.squares[a];
      }
    }
    return null;
  }

  isDraw() {
    let draw = []
    this.state.squares.forEach(item => {
      if (item == null) draw.push(item)
    })
    return draw.length < 0
  }

  resetGame () {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      history: []
    })
  }

  render () {
    const status = `Next player: ${this.state.xIsNext ? 'X' : ' O'}`
    const button = this.isWin() != null || this.isDraw() ? <button onClick={ this.resetGame }>Restart</button> : null
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.state.squares.map((values, index) => {
            if (index < 3) return this.renderSquare(values, index)
            else return null
          })}
        </div>
        <div className="board-row">
          {this.state.squares.map((values, index) => {
            if (index < 6 && index >= 3) return this.renderSquare(values, index)
            else return null
          })}
        </div>
        <div className="board-row">
          {this.state.squares.map((values, index) => {
            if (index >= 6) return this.renderSquare(values, index)
            else return null
          })}
        </div>
        <p>Winner: {this.isWin() || this.isDraw() ? 'Draw' : null}</p>
        <ol>
          { this.state.history.map(values => <li key={ values }>{ values }</li>) }
        </ol>
        { button }
      </div>
    )
  }
}
