import React, {useState} from 'react';
import styles from './App.module.scss';
import Canvas from "./component/Canvas";
import NumberInput from "./component/NumberInput";
import {MODE__POLYGONAL_CHAIN, MODE__SIMPLE_POLYGON} from "./mode";
import SelectInput from "./component/SelectInput";
import {generateRandomPoints} from "./geometry";

const MIN = 0
const MAX = 25

const options = [
    {
        value: MODE__POLYGONAL_CHAIN,
        display: 'Polygonal Chain'
    },
    {
        value: MODE__SIMPLE_POLYGON,
        display: 'Simple Polygon'
    },
]

function App() {
    const [points, setPoints] = useState([]);
    const [mode, setMode] = useState(MODE__POLYGONAL_CHAIN)
    const handleNumericInputChange = (event) => {
        const numberOfPoints = event.target.value;
        if (numberOfPoints >= MIN && numberOfPoints <= MAX) {
            setPoints(generateRandomPoints(1, 1, numberOfPoints))
        }
    }

    const handleSelection = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
    }

    return (
        <div className={styles.App}>
            <Canvas mode={mode} points={points}/>
            <div className={styles.controls}>
                <SelectInput options={options} onChange={handleSelection}/>
                <NumberInput max={MAX} onChange={handleNumericInputChange} numberOfPoints={points.length}/>
            </div>
        </div>
    );
}

export default App;
