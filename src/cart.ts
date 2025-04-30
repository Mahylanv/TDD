import { z } from 'zod';

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive({ message: "Le prix doit être positif" }),
  quantity: z.number().int().positive({ message: "La quantité doit être supérieure à 0" }),
});

let cart: Product[] = [];

export function addProduct(product: Product): void {
  ProductSchema.parse(product);

  const productCopy = { ...product };

  const index = cart.findIndex(p => p.id === product.id);
  if (index !== -1) {
    cart[index] = {
      ...cart[index],
      quantity: cart[index].quantity + product.quantity
    };
  } else {
    cart.push(productCopy);
  }
}

export function removeProduct(productId: string): void {
  cart = cart.filter(p => p.id !== productId);
}

export function getProductCount(): number {
  return cart.reduce((total, p) => total + p.quantity, 0);
}

export function getTotal(): number {
  return cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
}


export function applyDiscount(code: string): void {
  if (code === 'PROMO10') {
    cart = cart.map(p => ({ ...p, price: p.price * 0.9 }));
  } else {
    throw new Error('Invalid discount code');
  }
}

export function resetCart(): void {
  cart = [];
}

export function getCart(): Product[] {
  return cart;
}
