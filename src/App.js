import React, {useState} from 'react';
import styles from './App.module.scss';
import Canvas from "./component/Canvas";
import NumberInput from "./component/NumberInput";

const MIN = 0
const MAX = 25

function App() {
    const [numberOfPoints, setNumberOfPoints] = useState(MIN);
    const handleNumericInputChange = (event) => {
        const points = event.target.value;
        if (points >= MIN && points <= MAX) {
            setNumberOfPoints(points);
        }
    }

    return (
        <div className={styles.App}>
            <Canvas numberOfPoints={numberOfPoints}/>
            <div className={styles.controls}>
                <NumberInput max={MAX} onChange={handleNumericInputChange} numberOfPoints={numberOfPoints}/>
            </div>
        </div>
    );
}

export default App;
