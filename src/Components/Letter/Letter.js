import classes from './Letter.module.css';

const Letter = (props) => {
    
    return(
        <div className={classes.letter}>
            {props.children}
        </div>
    )
}

export {Letter};