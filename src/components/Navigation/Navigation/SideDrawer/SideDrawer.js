import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import classes from '../SideDrawer/SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Au';

const sideDrawer = (props) => {
    let attachedClasses =[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open}  clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo height="11%"/></div>
            <nav>
                <NavigationItems isAuthenticates={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
}
export default sideDrawer;