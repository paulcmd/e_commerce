import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { commerce } from '../lib/commerce'
import { classes } from 'istanbul-lib-coverage'
import CartItem from './CartItem/CartItem'

import useStyles from './styles'

const Cart = ({
    cart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart
}) => {
    const classes = useStyles()

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart...
            <Link to="/" className={classes.link}>
                start adding some!
            </Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid xs={12} sm={4} key={item.id}>
                        <div>
                            <CartItem item={item}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        </div>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <button
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </button>
                    <button
                        className={classes.checkoutButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography
                className={classes.title}
                variant="subtitle1"
                variant="h3"
                gutterBottom
            >
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart

// // /*
// // const isEmpty = !cart.line_items.length means if cart is empty ie 0, 0 is falsy
// // opp of false is true thus cart is empty.
// // - if cart has items, false of a truthy value is false, thus cart not empty.
// // */
