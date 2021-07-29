const url = new URL(
    'https://api.chec.io/v1/services/locale/chkt_vlKeRrX2vbmxWo/countries/AT/subdivisions'
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
    .then((json) => console.log(json))
