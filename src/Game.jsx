import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    let [count, setCount] = useState(0);
    count = currentMove;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCount(count + 1);
        // console.log(count);
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
            <Board onPlay={handlePlay} count={count} xIsNext={xIsNext} squares={currentSquares} />
            <div className="bg-slate-600">
                <ol className="bg-white text-black font-bold">{moves}</ol>
            </div>
        </>
    )
}