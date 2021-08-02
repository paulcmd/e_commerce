import React, { useState, useEffect } from 'react'
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountryCode, setShippingCountryCode] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm()

    //console.log('checkoutToken', checkoutToken)
    //const { id } = checkoutToken

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(checkoutTokenId)
        console.log('Countries : ', countries)
        setShippingCountries(countries)
        //console.log(Object.entries(countries)[0][1])
        // setShippingCountry(Object.keys(countries)[0])
        console.log(checkoutTokenId)
    }

    const fetchShippingSubdivisions = async (
        checkoutTokenId,
        shippingCountryCode
    ) => {
        const url = new URL(
            `https://api.chec.io/v1/services/locale/${checkoutTokenId}/countries/${shippingCountryCode}/subdivisions`
        )

        let headers = {
            'X-Authorization': process.env.REACT_APP_CHEC_PUBLIC_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then(({ subdivisions }) => {
                setShippingSubdivisions(subdivisions)
                setShippingSubdivision(Object.keys(subdivisions)[0])
                //console.log('Shipping subdivision : ', shippingSubdivision)
            })

        // const { subdivisions } =
        //     await commerce.services.localeListShippingSubdivisions(
        //         checkoutTokenId,
        //         shippingCountryCode
        //     )
        // console.log('Subdivision response', subdivisions)
        // setShippingSubdivisions(subdivisions)
        // setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (
        checkoutTokenId,
        shippingCountryCode,
        shippingSubdivision = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            {
                country: shippingCountryCode,
                region: shippingSubdivision
            }
        )

        console.clear()
        console.log('Shipping Options Country : ', options[0].countries)
        console.log('Shipping Options Description : ', options[0].description)
        console.log('Shipping Options Object : ', options)
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        shippingCountryCode &&
            fetchShippingSubdivisions(checkoutToken.id, shippingCountryCode)
    }, [shippingCountryCode])

    useEffect(() => {
        shippingSubdivision &&
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountryCode,
                shippingSubdivision
            )
    }, [shippingSubdivision])

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name
    }))

    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name
        })
    )

    // console.log('Shipping Countries', shippingCountries)
    // console.log('Shipping Country', shippingCountryCode)
    // console.log('All countries with Id and Label', countries)
    //console.log('Checkout Token ID : ' , checkoutToken.id)
    //console.log('Shipping subdivisions', subdivisions)

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.submit}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First Name" />
                        <FormInput name="lastName" label="Last Name" />
                        <FormInput name="address1" label="Address" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="ZIP/ Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountryCode}
                                fullWidth
                                onChange={(e) =>
                                    setShippingCountryCode(e.target.value)
                                }
                            >
                                {countries.map((country) => (
                                    <MenuItem
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) =>
                                    setShippingSubdivision(e.target.value)
                                }
                            >
                                {subdivisions.map((subdivision) => (
                                    <MenuItem
                                        key={subdivision.id}
                                        value={subdivision.id}
                                    >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) =>
                                    setShippingOption(e.target.value)
                                }
                            >
                                {shippingOptions.map(
                                    ({ id, description, price }) => (
                                        <MenuItem key={id} value={id}>
                                            {` ${description} - (${price.formatted_with_symbol}`}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

/* 
-Object.entries will create an array of both key and value pairs for each entry
-Object.values - just the values
_Object.keys - just the keys

 whatever value is selected, set it as the shippingCountry

Object.entries(shippingCountries).map(([code, name])=> ({id: code, label: name})) - we are destructuring the key value pairs as code and name. This is done so we
can give <MenuItem> an id and a label(separately)
we then create an object with each item in the array with country code as id and name as label.

setShippingCountry(Object.keys(countries)[0]) this places the first country in the <Select> field
onChange={e=>setShippingCountry(e.target.value)}> allows user to select a country in the menu, and into the <Select> field
*/
