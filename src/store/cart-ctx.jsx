import { createContext } from "react";


export const CartContext = createContext({
    items: [],
    addToCart: (id) => {},
    updateCart: (productId, amount) => {}
})


// const CartProvider = () => {

//     return <CartContext.Provider value={}>

//     </CartContext.Provider>
// } 