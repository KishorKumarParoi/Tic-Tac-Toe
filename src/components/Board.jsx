import calculateWinner from './CalculateWinner.jsx';
import Square from './Square.jsx';

export default function Board({ onPlay, count, squares, xIsNext }) {

    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = `Winner: ${winner.winner}`;
        console.log(winner.line);

        let [a, b, c] = winner.line;
        let firstElement = document.getElementById(`square-${a}`);
        let secondElement = document.getElementById(`square-${b}`);
        let thirdElement = document.getElementById(`square-${c}`);

        firstElement.classList.add('highlight');
        secondElement.classList.add('highlight');
        thirdElement.classList.add('highlight');

    } else {
        if (count === 9) {
            status = 'Match Drawn';
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }

        document.querySelectorAll('.highlight').forEach((square) => {
            square.classList.remove('highlight');
        });
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
        const boardCols = [...Array(boardLength).keys()].map((col) => {
            const index = row * boardLength + col;

            return (
                <Square key={index} id={`square-${index}`} value={squares[index]} onSquareClick={() => handleClick(index)} />
            )
        });

        return (
            <div key={row} className='flex flex-row'>
                {boardCols}
            </div>
        )
    })


    return (
        <>
            <div>
                <h1 className="bg-yellow-500 text-black font-semibold pl-2">{status}</h1>
                {boardRows}
            </div>
        </>
    )
}

