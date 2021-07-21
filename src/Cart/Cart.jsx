import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { classes } from 'istanbul-lib-coverage'

import useStyles from './styles'

const Cart = ({ cart }) => {
    const classes = useStyles()

    console.clear()
    console.log('cart', cart.line_items)
    const isEmpty = cart.line_items.length === 0

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart!
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid xs={12} sm={4} key={item.id}>
                        <div>{item.name}</div>
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

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="subtitle1">
                Your Shopping Cart
            </Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart

// // /*
// // const isEmpty = !cart.line_items.length means if cart is empty ie 0, 0 is falsy
// // opp of false is true thus cart is empty.
// // - if cart has items, false of a truthy value is false, thus cart not empty.
// // */
