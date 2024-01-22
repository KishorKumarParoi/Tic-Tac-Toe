import { useState } from "react";

function Square({ value, onSquareClick }) {

    return (
        <>
            <button className="border border-5 border-gray-500  bg-white text-Black text-7xl h-32 w-32 font-semibold leading-9 m-2" onClick={onSquareClick}>{value}</button>
        </>
    )
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    function handleClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = 'X';
        setSquares(nextSquares);
    }

    return (
        <>
            <div>
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