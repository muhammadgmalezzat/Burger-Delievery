import React from 'react'
import burgerLogo from '../../assests/images/burger-logo.png'
import Styles from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={Styles.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    )
};

export default Logo