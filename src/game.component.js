import React from "react";
import Board from './board.component';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            message:"Hello ogün"
        };

    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                changed: "(" + i % 3 + "," + Math.floor(i / 3) + ")"
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
    reverse() {
        const history = this.state.history;
        this.setState({
            history: history.reverse()
        });
    }
    handleChange = (e) =>{ 
        this.setState({message: e.target.value});
      }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((move, step) => {

            const desc = step ?
                'Go to move #' + step :
                'Go to game start';
            return (
                <li key={step}>
                    <button className="btn btn-primary" onClick={() => this.jumpTo(step)}>{desc}<b>{move.changed}</b></button>
                </li>
            );
        });
        let status;

        if (winner) {
            status = 'Winner:' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="row">{this.state.message}
                <div className="col-md-push-4 col-md-4">
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                            <ol>{moves}</ol>
                            <button onClick={() => this.reverse()}>Reverse</button>
                        </div>

                    </div>
                </div>
            
            <div class="form-group">
                <input type="text" id="exampleInputFile" value={this.state.message} onChange={this.handleChange}/>
            </div>
            
            </div>
        );
    }
}

function calculateWinner(squares) {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }

    }
    return null;
}

export default Game;