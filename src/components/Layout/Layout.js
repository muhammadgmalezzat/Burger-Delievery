import React, { Component } from 'react'
import Auxiliary from '../../HOC/auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerClosedHandle = () => {
        this.setState({ showSideDrawer: false });
    }

    SideDrawerToggleHandle = () => { 
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    render() { 
        return (
        <Auxiliary>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandle }/>
                <SideDrawer open={this.state.showSideDrawer }  closed={ this.SideDrawerClosedHandle}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
    )
    }
    
};

export default Layout