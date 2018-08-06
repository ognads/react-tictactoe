import React from "react";
import Square from './square.component';
class Board extends React.Component {
    
    renderSquare(i) {
        //this means Board in game
        return <Square 
                    value={this.props.squares[i]} 
                    onClick={() => this.props.onClick(i)}
                />;
    }
    
    render() {
        const squares = [];
        for (let index = 0; index < 3; index++) {
            squares.push(React.createElement('div', { className: 'board-row' }, this.renderSquare(index * 3), this.renderSquare(index * 3 + 1), this.renderSquare(index * 3 + 2)));
        }
        return (
            <div>
                {squares}
            </div>
        );
    }
}


export default Board;