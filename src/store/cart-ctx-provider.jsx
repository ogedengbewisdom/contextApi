import { CartContext } from "./cart-ctx"
import { useReducer, useState } from 'react';
import { DUMMY_PRODUCTS } from "../dummy-products";

const initialObject = {
    items: []
};

const inialFunction = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity++
            }
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            const product = DUMMY_PRODUCTS.find(item => item.id === action.payload);
            updatedItems.push({
              id: action.payload,
              name: product.title,
              price: product.price,
              quantity: 1,
            
            })
        }
        return {items: updatedItems}
    } if (action.type === "REMOVE_ITEM") {
        let updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
        const existingCartItem = updatedItems[existingCartItemIndex];
       

        if (existingCartItem && existingCartItem.quantity <= 0) {
            updatedItems = updatedItems.filter(item => item.id !== action.payload);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity--
            }

            updatedItems[existingCartItemIndex] = updatedItem
        }return {items: updatedItems}
    }
    return state
}

const CartContextProvider = ({children}) => {

    const [shoppingCartState, dispatchShoppingCart] = useReducer(inialFunction, initialObject)
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    function handleUpdateCartItemQuantity(productId, amount) {
        // setShoppingCart((prevShoppingCart) => {
        //   const updatedItems = [...prevShoppingCart.items];
        //   const updatedItemIndex = updatedItems.findIndex(
        //     (item) => item.id === productId
        //   );
    
        //   const updatedItem = {
        //     ...updatedItems[updatedItemIndex],
        //   };
    
        //   updatedItem.quantity += amount;
    
        //   if (updatedItem.quantity <= 0) {
        //     updatedItems.splice(updatedItemIndex, 1);
        //   } else {
        //     updatedItems[updatedItemIndex] = updatedItem;
        //   }
    
        //   return {
        //     items: updatedItems,
        //   };
        // });

        dispatchShoppingCart({type: "REMOVE_ITEM", payload: productId})
      }
      function handleAddItemToCart(id) {
        // setShoppingCart((prevShoppingCart) => {
        //   const updatedItems = [...prevShoppingCart.items];
    
        //   const existingCartItemIndex = updatedItems.findIndex(
        //     (cartItem) => cartItem.id === id
        //   );
        //   const existingCartItem = updatedItems[existingCartItemIndex];
    
        //   if (existingCartItem) {
        //     const updatedItem = {
        //       ...existingCartItem,
        //       quantity: existingCartItem.quantity + 1,
        //     };
        //     updatedItems[existingCartItemIndex] = updatedItem;
        //   } else {
        //     const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        //     updatedItems.push({
        //       id: id,
        //       name: product.title,
        //       price: product.price,
        //       quantity: 1,
        //     });
        //   }
    
        //   return {
        //     items: updatedItems,
        //   };
        // });
        dispatchShoppingCart({type: "ADD_ITEM", payload: id})
      }

    const value = {
        items: shoppingCartState.items,
        addToCart: handleAddItemToCart,
        updateCart: handleUpdateCartItemQuantity
      }
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;