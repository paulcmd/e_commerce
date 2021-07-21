import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart } from './components'
import { commerce } from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    console.clear()
    console.log('cart', cart.line_items)

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        console.log('cart items', item.cart)

        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    //console.log('All Products', products)

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </div>
    )
}

export default App
