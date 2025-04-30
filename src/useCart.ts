import { useState } from 'react';
import {
    getCart,
    addProduct as addProductToCart,
    removeProduct as removeProductFromCart,
    getTotal as calculateTotal,
    resetCart as clearCart,
    Product
} from './cart';

export function useCart() {
    const [cart, setCart] = useState<Product[]>(getCart());

    const refresh = () => setCart([...getCart()]);

    const addProduct = (product: Product) => {
        addProductToCart(product);
        refresh();
    };

    const removeProduct = (productId: string) => {
        removeProductFromCart(productId);
        refresh();
    };

    const getTotal = () => calculateTotal();

    return {
        cart,
        addProduct,
        removeProduct,
        getTotal,
        resetCart: () => {
            clearCart();
            refresh();
        }
    };
}
