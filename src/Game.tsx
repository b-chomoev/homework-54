import {useState} from 'react';
import {GameCell} from './types';
import './Game.css';

const createGameCells = () => {
    const gameCells: GameCell[] = [];
    for (let i = 0; i < 36; i++) {
        const item: GameCell = {hasItem: false, clicked: false};
        gameCells.push(item);
    }

    const randomIndex = Math.floor(Math.random() * gameCells.length);
    gameCells[randomIndex].hasItem = true;

    return gameCells;
};

const Game = () => {
    const  [cells, setCells] = useState(createGameCells());
    const [tries, setTries] = useState(0);
    const [diamondFound, setDiamondFound] = useState(false);
    const onCellClick = (index: number) => {
        if (diamondFound) return;

        setCells( (prevState) => {
            return prevState.map((cell, i) => {
                if (i === index) {
                    return {...cell, clicked: true};
                }
                return cell;
            });
        });
        setTries(prevState => prevState + 1);

        if (cells[index].hasItem) {
            setDiamondFound(true);
        }
    };

    const reset = () => {
        setCells(createGameCells());
        setTries(0);
        setDiamondFound(false);
    };

    return (
        <>
            <div className='game-grid'>
                {cells.map((cell, index) => (
                    <div
                        key={index}
                        className='game-cell'
                        style={{background: cell.clicked ? 'white' : undefined}}
                        onClick={() => onCellClick(index)}
                    >
                        {cell.clicked && cell.hasItem && '0'}
                    </div>
                ))}
            </div>
            <div className='game-container'>
                <div className='tries'>
                    Tries: {tries}
                </div>
                {diamondFound &&
                    <div className='zero-found-message'>
                        Congratulations! The number is found!
                    </div>
                }
                <button className='reset-button' onClick={reset}>Reset</button>
                {diamondFound && <div className='reset-info'>Press reset to start the game!</div>}
            </div>
        </>
    );
};

export default Game;
