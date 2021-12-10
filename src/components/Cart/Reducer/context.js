import React, { createContext, useContext, useEffect, useReducer } from 'react'
import cartItems from '../data'
import Reducer from './Reducer';

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = createContext();
const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState)

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        dispatch({ type: 'GET_TOTALS' })
    }, [state.cart])

    const fetchData = async () => {
        dispatch({ type: 'LOADING' })
        const response = await fetch(url);
        console.log(response)
        const cart = await response.json();
        dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
    }
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }
    const remove = (id) => {
        dispatch({ type: 'REMOVE', payload: id })
    }
    const increase = (id) => {
        dispatch({ type: 'INCREASE', payload: id })
    }
    const decrease = (id) => {
        dispatch({ type: 'DECREASE', payload: id })
    }
    const toggleAmount = (id, type) => {
        dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
    }
    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                remove,
                increase,
                decrease,
                toggleAmount
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }
