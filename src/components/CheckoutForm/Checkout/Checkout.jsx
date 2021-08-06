import React, { useState, useEffect } from 'react'
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button
} from '@material-ui/core'

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, errorMessage }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart'
                })
                //console.log('token',token)
                setCheckoutToken(token)
            } catch (error) {}
        }

        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)

    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
        //console.log('Next data : ', data)
    }

    console.log('Shipping data : ', shippingData)

    const Confirmation = () => (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase,{' '}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">
                    Order ref : 
                </Typography>
            </div>
            <br />
            <Button component={Link} to='/'></Button>
        </>
    )

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                onCaptureCheckout={onCaptureCheckout}
                nextStep={nextStep}
                backStep={backStep}
            />
        )

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Confirmation />
                    ) : (
                        checkoutToken && <Form />
                    )}
                </Paper>
            </main>
        </>
    )
}

export default Checkout

/* steps.length will run after the last step in form. ie
last index in steps + 1

next function is collecting data from addressForm and setting it to shippingData state
*/
