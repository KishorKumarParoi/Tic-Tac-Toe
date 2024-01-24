
export default function Square({ id, value, onSquareClick }) {
    return (
        <>
            <button className="border border-5 border-gray-500  bg-white text-Black text-7xl h-32 w-32 font-semibold leading-9 m-2" id={id} onClick={onSquareClick}>{value}</button>
        </>
    )
}