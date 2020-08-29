import React from "react";
import styles from './Button.module.scss'

const Button = (props) => {
    return <button className={styles.button} onClick={props.onClick}>{props.display}</button>
}

export default Button;