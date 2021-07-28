import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    console.clear()
    console.log('cart', cart)

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)

        // console.log('cart items', item.cart)

        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()

        setCart(cart)
    }

    //console.log('All Products', products)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </Route>
                    <Route path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
