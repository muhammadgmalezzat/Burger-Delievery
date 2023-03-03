import React from 'react';
import Auxiliary from '../../../HOC/auxiliary';
import Button from '../../../components/UI/Button/Button';
import Styles from './OrderSummary.module.css'

const OrderSummary = ({ ingredients,totalPrice ,purchaseCancel,purchaseContinue}) => {
    const ingredientSummary = Object.keys(ingredients).map(
        (igKey) => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
                    {ingredients[igKey]}
                </li>
            );
        }
    );
    
    return (
        <Auxiliary>
            <div className={Styles.summery}>
                <div className={Styles.order}>Order Summary</div>
                <h3>Your Order</h3>
                <p>A Delicious Burger With the following ingredient: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h2>Check : { totalPrice.toFixed(2) } $</h2>
                <p>continue to Cheack out?</p>
                <div className={Styles.btns}>
                    <Button btnType="Danger" clicked={purchaseCancel}>Cancel</Button>
                    <Button btnType="Success" clicked={purchaseContinue}>Continue</Button>
                </div>
            </div>
        </Auxiliary>
    )
};
export default OrderSummary