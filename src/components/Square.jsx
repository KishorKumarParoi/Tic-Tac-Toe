import { useState } from "react";

export default function Square() {
    const [square, setSquare] = useState(null);
    function handleClick() {
        setSquare('X');
    }
    return (
        <button className="square" onClick={handleClick}>{square}</button>
    )
}