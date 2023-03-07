import React from 'react'
import Styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const NavigationItems = (props) => {
    return (
        <ul className={Styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/checkout" >Checkout</NavigationItem>
            {
                props.isAuth ?
                    <NavigationItem link="/orders" >Orders</NavigationItem> :
                    null
            }
            {
                !props.isAuth ?
                    <NavigationItem link="/auth" >Login</NavigationItem> :
                    <NavigationItem link="/logout" >Logout</NavigationItem>
            }
        </ul>
    )
};



export default NavigationItems