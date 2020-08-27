import React from "react";

const NumberInput = (props) => {
    return <input type='number' min={0} max={props.max} onChange={props.onChange} value={props.numberOfPoints}/>
}

export default NumberInput;