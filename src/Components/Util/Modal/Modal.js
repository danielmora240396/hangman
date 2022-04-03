import classes from './Modal.module.css';
import { useState } from 'react';

const Modal = (props) => {

    return (
        <div className={classes.modal}>
           {props.children}
        </div>
    )
}

export { Modal };