import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import {
    Elements,
    CardElement,
    ElementsConsumer
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ checkoutToken, backStep }) => {
    const handleSubmit = (event, elements, stripe) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
		})

		if (error) {
			console.log('Payment Method Creation Error : ', error)
		}
		

    }
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form
                            onSubmit={(event) =>
                                handleSubmit(event, elements, stripe)
                            }
                        >
                            <CardElement />
                            <br /> <br />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => backStep()}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!stripe}
                                    color="primary"
                                >
                                    Pay{' '}
                                    {
                                        checkoutToken.live.subtotal
                                            .formatted_with_symbol
                                    }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm

/* we are passing the event (click event) to the form thru handleSubmit. the other 2 stripe dependencies
are needed to create the final object
e.preventDefault will stop page from refreshing( button doing default action in a form)

*/
