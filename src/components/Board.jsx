import calculateWinner from './CalculateWinner.jsx';
import Square from './Square.jsx';

export default function Board({ onPlay, count, squares, xIsNext }) {

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner.winner}`;
    } else {
        if (count === 9) {
            status = 'Match Drawn';
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const boardLength = 3;
    const boardRows = [...Array(boardLength).keys()].map((row) => {

        const boardSquares = [...Array(boardLength).keys()].map((col) => {

            const index = row * boardLength + col;

            return (
                <Square key={index}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                />
            );
        });

        return (
            <div key={row} className="flex flex-row">
                {boardSquares}
            </div>
        );
    });

    return (
        <>
            <div>
                <h1 className="bg-yellow-500 text-black font-semibold pl-2">{status}</h1>
                {boardRows}
            </div>
        </>
    )
}

