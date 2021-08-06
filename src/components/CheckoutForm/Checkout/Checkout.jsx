import React, { useState, useEffect } from 'react'
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
    CssBaseline
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, errorMessage }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart'
                })
                //console.log('token',token)
                setCheckoutToken(token)
            } catch (error) {
                console.log('generateToken Error : ', error)

                setTimeout(() => {
                    history.push('/')
                }, 4000)
            }
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

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    const { customer, customer_reference } = order
    let Confirmation = () =>
        customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        {`Thank you for your purchase,
                        ${customer.firstname}
                        ${customer.lastname}`}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref : {customer_reference}
                    </Typography>
                </div>
                <br />
                <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    type="button"
                >
                    Back to Home
                </Button>
            </>
        ) : isFinished ? (
            <>
                <div>
                    <Typography variant="h5">
                        {`Thank you for your purchase!`}
                    </Typography>
                    <Divider className={classes.divider} />
                </div>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        )

    if (errorMessage) {
        ;<>
            <Typography variant="h5">Error : {errorMessage}</Typography>
            <br />
            <Button
                component={Link}
                to="/"
                variant="outlined"
                type="button"
            ></Button>
        </>
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                onCaptureCheckout={onCaptureCheckout}
                timeout={timeout}
                nextStep={nextStep}
                backStep={backStep}
            />
        )

    return (
        <>
            <CssBaseline />
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

if you choose not to enter card details, a confirmation page without user's name will be displayed


*/
