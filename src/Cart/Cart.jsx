import React, { useState, useEffect } from 'react'
import {
    Container,
    Typography,
    Button,
    Grid,
    CssBaseline
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { commerce } from '../lib/commerce'
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
            <main className={classes.content}>
                <CssBaseline />
                <Grid
                    container
                    justifyContent="center"
                    spacing={4}
                    style={{ margin: 20 }}
                >
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={5} key={item.id}>
                            <div>
                                <CartItem
                                    item={item}
                                    handleUpdateCartQty={handleUpdateCartQty}
                                    handleRemoveFromCart={handleRemoveFromCart}
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </main>

            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </Button>
                    <Button
                        component={Link}
                        to="/checkout"
                        className={classes.checkoutButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Loading...'

    return (
        <Container>
            <CssBaseline />
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
