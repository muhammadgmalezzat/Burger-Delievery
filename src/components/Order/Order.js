import React from 'react';

import classes from './Order.module.css';

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
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default order;