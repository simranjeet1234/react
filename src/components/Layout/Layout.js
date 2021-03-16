import React, { Component } from 'react';
import Aux from '../../hoc/Au';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state ={
            showSideDrawer: true
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
        open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}></SideDrawer>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
    }
}

export default Layout;