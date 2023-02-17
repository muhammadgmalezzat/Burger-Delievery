import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Styles from './CheckoutSummery.module.css'

const CheckoutSummery = (props) => {

    return (
        <div className={Styles.CheckoutSummery}>
            <h1>We hope it tastes well 😊</h1>
            <div style={{ width: '100%',margin:'auto' }}>
                <Burger ingredientsFromBuilderBurger={props.ingredients}/> 
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>
                Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}
            >
                Continue</Button>
            
        </div>
    )
};

export default CheckoutSummery