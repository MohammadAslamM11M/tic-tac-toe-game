import React, { useState } from "react";
import "./App.css";

function App() {
    const [grid, setGrid] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [currPlayer, setCurrPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (grid[row][col] === "") {
            const newGrid = [...grid];
            newGrid[row][col] = currPlayer;
            setGrid(newGrid);
        }

        if (checkForWinner()) {
            setWinner(currPlayer);
            setWinningCombo(findWinningCombo());
        } else {
            setCurrPlayer(currPlayer === "X" ? "O" : "X");
        }
    };

    const lines = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0],
        ],
    ];

    const [winningCombo, setWinningCombo] = useState([]);

    const checkForWinner = () => {
        for (const line of lines) {
            const [a, b, c] = line;
            if (grid[a[0]][a[1]] && grid[a[0]][a[1]] === grid[b[0]][b[1]] && grid[a[0]][a[1]] === grid[c[0]][c[1]]) {
                return grid[a[0]][a[1]];
            }
        }

        return null;
    };

    const findWinningCombo = () => {
        for (const line of lines) {
            const [a, b, c] = line;
            if (grid[a[0]][a[1]] && grid[a[0]][a[1]] === grid[b[0]][b[1]] && grid[a[0]][a[1]] === grid[c[0]][c[1]]) {
                return line.map(([row, col]) => row * 3 + col);
            }
        }

        return [];
    };

    const resetGame = () => {
        setGrid([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);

        setCurrPlayer("X");
        setWinner(null);
        setWinningCombo([]);
    };

    return (
        <>
            <div className="App">
                <h1 className="heading">TIC TAC TOE</h1>
                <div className="wrapper">
                    <div className="gridContainer">
                        {grid.map((row, rowIndex) => (
                            <div className="row" key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <div
                                        className={`cell ${
                                            winningCombo.includes(rowIndex * 3 + colIndex) ? "winning" : ""
                                        }`}
                                        key={colIndex}
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                    >
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="restBtn" onClick={resetGame}>
                    Reset Game
                </button>
            </div>
            <div className="winner">{winner && `Winner is ${winner}`}</div>
        </>
    );
}

export default App;
