import React from "react";
import styles from './SelectInput.module.scss'

const SelectInput = (props) => {
    return <select className={styles.selectInput} onChange={props.onChange}>
        {props.options.map(option => <option value={option.value} key={option.value}>{option.display}</option>)}
    </select>
}

export default SelectInput;