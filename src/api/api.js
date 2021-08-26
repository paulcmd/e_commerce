

export const api = async (checkoutTokenId, shippingCountryCode) => {
    const url = new URL(
        `https://api.chec.io/v1/services/locale/${checkoutTokenId}/countries/${shippingCountryCode}/subdivisions`
    )

    let headers = {
        'X-Authorization': process.env.REACT_APP_CHEC_PUBLIC_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    const { subdivisions } = await fetch(url, {
        method: 'GET',
        headers: headers
	}).then((response) => response.json())
	
	
	
	return subdivisions
	
}


