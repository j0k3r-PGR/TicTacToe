import { useState } from "react"
import "./App.css"

const TURNS = {
    X : 'x',
    O : 'o'
}

const Square = ({children, isSelected, updateBoard, index,className}) => {

    const newClassName = className + (isSelected ? ' is-selected' : '')

    const handleClick = () => {
        updateBoard(index)
    }

    return(
        <div className={newClassName} onClick={handleClick}>
            {children}
        </div>
    )
}

const WINNER_COMB = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

export function App(){
    const [board,setBoard ]= useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [win , setWin] = useState(null)

    const checkWinner = (boardToCheck) => {
        for (const comb of WINNER_COMB){
            const [a,b,c] = comb
            if (
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ){
                return boardToCheck[a]
            }
        }
        return null;
    }

    const updateBoard = (index) => {
        if (board[index] || win) return 
        const newBoard = [... board]
        newBoard[index] = turn 
        setBoard(newBoard)
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        const newWinner = checkWinner(newBoard)
        if (newWinner){
            setWin(newWinner)
        }
        let cont = 0
        newBoard.forEach( element => {
            if (element != null) cont++
            if (cont == 9 && !newWinner) setWin(false)
        })
    }

    const resetGame = () => {
        setWin(null)
        setTurn(TURNS.X)
        setBoard(Array(9).fill(null))
    }

    return(
        <div className="main">
            <h1>Tic Tac Toe</h1>
            <div className="Tictactoe">
                {
                    board.map((_ , index) => {
                        return(
                            <Square 
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                                className= {"box-"+index}
                            >
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </div>
            <div className="turns">
                <Square 
                    isSelected={turn === TURNS.X}
                    className="box"
                >
                    {TURNS.X}
                </Square>
                <Square 
                    isSelected={turn === TURNS.O}
                    className="box"
                >
                    {TURNS.O}
                </Square>
            </div>
            {
                (win !== null ) && (
                    <div className="winner">
                        <h2>
                            {
                                win === false
                                ? 'Empate'
                                : 'Gano: '
                            }
                        </h2>
                        <header>
                            {win && <Square className={"box"}>{win}</Square>}
                        </header>

                        <footer>
                            <button
                                onClick={resetGame}
                            >
                                empezar de nuevo</button>
                        </footer>
                    </div>
                    )
            }
        </div>
    )
}