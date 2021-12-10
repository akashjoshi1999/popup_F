import React from 'react'
import CartContainer from './Container/CartContainer'
import Navbar from './Navbar/Navbar'
import { useGlobalContext } from './Reducer/context'

function Cart() {
    const { loading } = useGlobalContext()
    console.log(loading)
    if (loading) {
        return (
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <main>
            <Navbar />
            <CartContainer />
        </main>
    )
}

export default Cart
