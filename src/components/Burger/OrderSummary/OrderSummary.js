import React from 'react';
import Auxiliary from '../../../HOC/auxiliary';
import Button from '../../../components/UI/Button/Button';
//import { useNavigate } from 'react-router';
//import Burger from '../Burger';

const OrderSummary = ({ ingredients,totalPrice ,purchaseCancel,purchaseContinue}) => {
    //const navigate = useNavigate()
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
            <div>OrderSummary</div>
            <h3>Your Order</h3>
            <p>A Delicious Burger With the following ingredient: </p>
            {/* <Burger ingredientsFromBuilderBurger={ingredients} /> */}
            <ul>
                {ingredientSummary}
            </ul>
            <h2>Check : { totalPrice.toFixed(2) } $</h2>
            <p>continue to Cheack out?</p>
            <Button btnType="Danger" clicked={purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={purchaseContinue}>Continue</Button>
            {/* <button onClick={()=> navigate('checkout')}>fff</button> */}
        </Auxiliary>
    )
};
export default OrderSummary