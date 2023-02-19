import React from 'react'
import styles from './BurgerOrder.module.css'
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom'

const Burger = (props) => {
    //console.log(props)
    let transformedIngredients = Object.keys(props.ingredientsFromBuilderBurger)
        .map(igKey => {
            return [...Array(props.ingredientsFromBuilderBurger[igKey])]
                .map( (_, i) => { return <BurgerIngredient key={igKey + i} type={igKey} />; } );
        }).reduce((arr, el) => { return arr.concat(el) }, []);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default withRouter(Burger);