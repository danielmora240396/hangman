import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div className={classes['lds-ripple']}><div></div><div></div></div>
    )
}

export {Loader}