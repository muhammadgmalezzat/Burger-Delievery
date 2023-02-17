import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const BuildControls = ({ ingredientAdded, ingredientRemoved, price, purchasable ,disabled,INGREDIENT_PRICES,purchasing}) => {
    return (
        
        <div className={styles.BuildControls}>
            <h1> Price : <strong>{price.toFixed(2)} $</strong> </h1>
            {
                controls.map((ctrl) => {
                    return (<BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        //هنا الفانكشن اتعملها call
                        added={() => ingredientAdded(ctrl.type)}
                        removed={() => ingredientRemoved(ctrl.type)}
                        disabled={disabled[ctrl.type]}
                        cost={INGREDIENT_PRICES[ctrl.type]}
                    />)
                })
            }
            <button className={styles.OrderButton} disabled={!purchasable} onClick={purchasing} >Order Now</button>
        </div>
    )
}


export default BuildControls