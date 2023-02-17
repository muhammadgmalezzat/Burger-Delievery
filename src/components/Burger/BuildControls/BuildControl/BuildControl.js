import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = ({ added, label, removed,cost ,disabled}) => {
    return (
        <div className={styles.BuildControl}>
            <div  className={styles.Label}>{label}</div>
            <button className={styles.Less} onClick={removed} disabled={disabled}>
                less
            </button>
            <button className={styles.More} onClick={added}>
                more
            </button>
            <h3 >Cost : {cost} $</h3>
        </div>
    )
};

export default BuildControl