import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), index: -1 }]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove].squares;
    const xIsNext = currentMove % 2 === 0;
    let [count, setCount] = useState(0);
    count = currentMove;

    const [ascending, setAscending] = useState(true);
    const displayOrder = ascending ? "Ascending Order" : "Descending Order";

    function toggleOrder() {
        setAscending(!ascending);
    }

    function handlePlay(nextSquares, i) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, index: i }];
        setHistory(nextHistory);
        setCount(count + 1);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((turnInfo, move) => {
        let description;
        const row = Math.floor(turnInfo.index / 3);
        const col = turnInfo.index % 3;
        const Symbol = turnInfo.index % 2 === 0 ? 'X' : 'O';
        const currentSquares = turnInfo.squares;

        if (move > 0) {
            console.log(currentSquares);
            description = `Go to move #${move} index: ${turnInfo.index} of Board[${row}][${col}] of Symbol: ${Symbol})`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move} className="mb-1 p-2 bg-yellow-500">
                {currentMove === move ? (
                    <>You are at move #{move} index : {turnInfo.index} of Board[{row}][{col}] of Symbol: {Symbol}) </>
                ) :
                    (
                        <button onClick={() => jumpTo(move)} >{description}</button>
                    )
                }
            </li>
        )
    })

    return (
        <>
            <div className="game">
                <Board onPlay={handlePlay} count={count} xIsNext={xIsNext} squares={currentSquares} />
                <div className="game-info">
                    <div className="center">
                        <button onClick={toggleOrder} className="mb-4 font-bold text-2xl bg-blue-400 p-2 rounded-md">{displayOrder}</button>
                    </div>
                    <ol className="bg-white text-black font-bold">{ascending ? moves : moves.slice().reverse()}</ol>
                </div>
            </div>
        </>
    )
}