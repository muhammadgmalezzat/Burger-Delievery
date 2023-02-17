import React from 'react'
import Styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => {
    return (
        <ul className={Styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/checkout" >Checkout</NavigationItem>
            <NavigationItem  link="/orders" >Oreders</NavigationItem>
        </ul>
    )
};

export default NavigationItems