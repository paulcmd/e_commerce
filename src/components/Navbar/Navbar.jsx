import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    MenuItem,
    Menu,
    Typography
} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/images/logo/logo.jpg'
import useStyles from './styles'

const Navbar = ({ totalItems }) => {
    const classes = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        <img
                            src={logo}
                            alt="logo"
                            height="25px"
                            className={classes.image}
                        />
                        E-Commerce Store
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.button}>

                        {location.pathname === '/' && (
                            <IconButton
                                component={Link}
                                to="/cart"
                                aria-label="Show cart items"
                                color="inherit"
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="secondary"
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar


/*
location.pathname === '/' ie only show the shopping cart button if we are on the home page
*/