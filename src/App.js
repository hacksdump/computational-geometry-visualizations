import React, {useState} from 'react';
import './App.scss';
import Canvas from "./component/Canvas";

const NumberInput = (props) => {
    return <input type='number' min={0} max={props.max} onChange={props.onChange} value={props.numberOfPoints}/>
}

function App() {
    const [numberOfPoints, setNumberOfPoints] = useState(0);
    const handleNumericInputChange = (event) => {
        const points = event.target.value;
        setNumberOfPoints(points);
    }

    return (
        <div className="App">
            <Canvas numberOfPoints={numberOfPoints}/>
            <NumberInput max={10} onChange={handleNumericInputChange} numberOfPoints={numberOfPoints}/>
        </div>
    );
}

export default App;
