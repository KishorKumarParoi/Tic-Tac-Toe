import CalculateWinner from "./CalculateWinner.jsx";
import Square from "./Square.jsx";

export default function Board({ xIsNext, squares, onPlay }) {

    function handleClick(index) {
        const nextSquares = squares.slice();
        if (squares[index] || CalculateWinner(squares)) return;

        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = CalculateWinner(squares);
    const [a, b, c] = winner || [];
    let status;
    if (winner) {
        console.log(a, b, c);
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </>
    )
}

