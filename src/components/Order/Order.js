import React from 'react';

import classes from './Order.module.css';

import BurgerOrder from '../../components/Burger/BurgerOrder/BurgerOrder'

const order = (props) => {
    //console.log(props.ingredients)
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    //console.log(ingredients)
    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'block',
                margin: '5px 8px',
                border: '1px solid #ccc',
                borderRadius:"5px",
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    console.log(ingredientOutput)
    return (
        <div className={classes.Order}>
            {/* //<BurgerOrder ingredientsFromBuilderBurger={props.ingredients}/> */}
            <div className={classes.details}>
                <p>Ingredients: {ingredientOutput}</p>
                <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            </div>
            <div className={classes.burgger}>
                <BurgerOrder style={{width:"20px  !important"}} ingredientsFromBuilderBurger={props.ingredients}/>
            </div>
            
        </div>
    );
};

export default order;