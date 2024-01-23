import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <>
            <button className="border border-5 border-gray-500  bg-white text-Black text-7xl h-32 w-32 font-semibold leading-9 m-2" onClick={onSquareClick}>{value}</button>
        </>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // left diagonal
        [2, 4, 6], // right diagonal
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return { winner: squares[a], line: line };
    }
    return null;
}

export default function Game() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const currentCount = currentMove;
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(newCount, nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        // console.log(history);
        // const nextCount = [...count.slice(0, currentMove + 1), newCount];
        setCount(newCount + 1);
        console.log(count);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move} className="mb-1 p-2 bg-yellow-500">
                <button onClick={() => jumpTo(move)} >{description}</button>
            </li>
        )
    })

    return (
        <>
            <Board onPlay={handlePlay} count={currentCount} xIsNext={!xIsNext} squares={currentSquares} />
            <div className="bg-slate-600">
                <ol className="bg-white text-black font-bold">{moves}</ol>
            </div>
        </>
    )
}

function Board({ onPlay, count, squares, xIsNext }) {

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
        onPlay(count, nextSquares, xIsNext);
    }

    return (
        <>
            <div>
                <h1 className="bg-yellow-500 text-black font-semibold pl-2">{status}</h1>
                <div className="flex">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="flex">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="flex">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </>
    )
}