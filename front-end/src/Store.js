import { createContext, useReducer } from 'react';



export const Store = createContext();


const initialState = {
    userInfo: localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null,

    cart: {
        // store in local storage in web and get of they exist 
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }

}


const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case "CART_ADD_ITEM":
            // add to cart 
            const newItem = action.payload
            console.log(newItem)
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            console.log(existItem)
            const cartItems = existItem ? state.cart.cartItems.map((item) =>
                item._id === existItem._id ? newItem : item
            ) : [...state.cart.cartItems, newItem];
            console.log(cartItems)
            // already update the catItems with the action CART_ADD_ITEM
            // save the local storage to the web browser
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            console.log(cartItems)
            // already update the catIteme with remove the list items in the cartScreen
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }

        case 'USER_SIGNIN':
            console.log(action.payload)
            return { ...state, userInfo: action.payload }

        case 'USER_SIGNOUT': {
            return {
                ...state, userInfo: null,
            }
        }
        default:
            return state
    }
}



export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;

}
