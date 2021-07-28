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
    const [shippingCountry, setShippingCountry] = useState('')
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
        setShippingCountries(countries)
        //console.log('Countries',countries)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    //fetchShippingCountries(checkoutToken.id)
	//console.log('Shipping Countries', shippingCountries)
	
	const countriesArray = Object.keys(shippingCountries)
	console.log('countries array', countriesArray)

	const mappedCountries = countriesArray.map((country) => {
		return (
			<div>
				{country}
			</div>
		)
	})

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.submit}>
                    <Grid container spacing={3}>
                        <FormInput
                            required
                            name="firstName"
                            label="First Name"
                        />
                        <FormInput required name="lastName" label="Last Name" />
                        <FormInput required name="address1" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput
                            required
                            name="zip"
                            label="ZIP/ Postal Code"
                        />
                        {/* <Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}>
									Select Me
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}>
									Select Me
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}>
									Select Me
								</MenuItem>
							</Select>
						</Grid> */}
                    </Grid>
				</form>
				{mappedCountries}
            </FormProvider>
        </>
    )
}

export default AddressForm


/* 
-Object.entries will create an array of both key and value pairs for each entry
-Object.values - just the values
_Object.keys - just the keys
*/