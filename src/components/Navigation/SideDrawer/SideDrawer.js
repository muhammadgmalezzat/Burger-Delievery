import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../HOC/auxiliary';


const SideDrawer = (props) => {
    let attachedClasses = [Styles.SideDrawer, Styles.Close];
        if (props.open) {
            attachedClasses = [Styles.SideDrawer, Styles.Open];
        }


    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed }/>
            <div className={attachedClasses.join(' ')}>
            <div className={Styles.Logo}>
                <Logo />
            </div>
            
            <nav>
                    <NavigationItems isAuth={props.isAuth }/>
            </nav>
            
            </div>
        </Auxiliary>
        
    )
};

export default SideDrawer