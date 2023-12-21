"use client"
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// Pour le panier
export const CartContext = createContext({});

// Fonction pour calculer le total des produit dans le panier
export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;

    if (cartProduct.size) {
        price += cartProduct.size.price;
    }

    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price
        }
    }

    return price;
}

// Pour l'authentification on crée un SessionProvider pour l'importer dans Layout.js
export default function AppProvider({ children }) {
    
    const [cartProducts, setCartProducts] = useState([]);

    //Grabb localStorage
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    },[])
    

    // Fonction pour sauvegarder les produit dans le localStorage
    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    //Fonction pour ajouter au panier
    function addToCart(product, size=null, extras=[]) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras }
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts);
            return newProducts
        });
        
    }

    //Fonction pour retirer un produit du panier
    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
         toast.success('Produit supprimer du panier')
    }

    //Fonction pour clear le panier
    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }


    return (
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart}}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}