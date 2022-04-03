import classes from './Header.module.css';

const Header = (props) => {
    return (
        <nav className={classes.header}>
            {props.children}
           
        </nav>
    )
}

export { Header };