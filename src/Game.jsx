import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
    const [currentMove, setCurrentMove] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(squares) {
        const nextHistory = [...history.slice(0, currentMove + 1), squares];
        // console.log(nextHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // function highlightWinner(a, b, c) {

    // }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} >{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            {/* <div>{`You are now at move ${currentMove}\n`}</div> <br /> */}
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}