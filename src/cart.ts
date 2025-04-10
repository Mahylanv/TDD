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

// Implémentation initiale (stubs) qui fait échouer tous les tests.

export function addProduct(product: Product): void {
  throw new Error("Erreur");
}

export function removeProduct(productId: string): void {
  throw new Error("Erreur");
}

export function getProductCount(): number {
  throw new Error("Erreur");
}

export function getTotal(): number {
  throw new Error("Erreur");
}

export function applyDiscount(code: string): void {
  throw new Error("Erreur");
}

export function resetCart(): void {
  throw new Error("Erreur");
}
