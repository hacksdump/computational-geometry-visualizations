import React from "react";
import styles from './NumberInput.module.scss'

const NumberInput = (props) => {
    return <input className={styles.inputBox} type='number' min={0} max={props.max} onChange={props.onChange} value={props.numberOfPoints}/>
}

export default NumberInput;