import React, { Component } from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../HOC/auxiliary';

class Modal extends Component  {
    //we didn't need model rerendered only if the show property changed
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        
        return (
            <Auxiliary>
            
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                className={styles.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                
                {this.props.children}
            </div>
        </Auxiliary>
        )
    }

};
export default Modal