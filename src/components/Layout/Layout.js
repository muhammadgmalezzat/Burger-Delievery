import React, { Component } from 'react'
import Auxiliary from '../../HOC/auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
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
                <Toolbar
                    isAuth={this.props.token}
                    drawerToggleClicked={this.SideDrawerToggleHandle} />
                <SideDrawer
                    isAuth={this.props.token}
                    open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandle} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
    )
    }
    
};
const mapStateToProps = (state) => {
    return {
        token: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout)