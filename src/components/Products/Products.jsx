import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'

const products = [
    {
        id: '1',
        name: 'Shoes',
        price: '$5',
        description: 'Running Shoes',
        image: 'https://www.vionicshoes.com/media/cms_pages/vionic2021/home-summer/images/feature-mens-0701.jpg'
    },

    {
        id: '2',
        name: 'MacBook',
        price: '$10',
        description: 'Apple MacBook',
        image: 'https://www.apple.com/newsroom/images/product/accessories/standard/Apple_MacBook-Pro-Battery_062019_big.jpg.large.jpg'
    }
]

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
