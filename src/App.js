import React, {useState} from 'react';
import styles from './App.module.scss';
import Canvas from "./component/Canvas";
import NumberInput from "./component/NumberInput";
import {MODE__POLYGONAL_CHAIN, MODE__SIMPLE_POLYGON} from "./mode";
import SelectInput from "./component/SelectInput";

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
    const [numberOfPoints, setNumberOfPoints] = useState(MIN);
    const [mode, setMode] = useState('')
    const handleNumericInputChange = (event) => {
        const points = event.target.value;
        if (points >= MIN && points <= MAX) {
            setNumberOfPoints(points);
        }
    }

    const handleSelection = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
    }

    return (
        <div className={styles.App}>
            <Canvas mode={mode} numberOfPoints={numberOfPoints}/>
            <div className={styles.controls}>
                <SelectInput options={options} onChange={handleSelection}/>
                <NumberInput max={MAX} onChange={handleNumericInputChange} numberOfPoints={numberOfPoints}/>
            </div>
        </div>
    );
}

export default App;
