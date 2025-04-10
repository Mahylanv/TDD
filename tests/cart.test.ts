import { describe, it, expect, beforeEach } from 'vitest';
import { addProduct, removeProduct, getProductCount, getTotal, applyDiscount, resetCart, Product } from '../src/cart';

// TODO : ajouter d'autres tests pour le module cart
const validProduct: Product = {
  id: 'p1',
  name: 'Produit Test',
  price: 100,
  quantity: 1,
};

describe("cart module", () => {

  beforeEach(() => {
    resetCart();
  });

  it("should add a product to the cart", () => {
    addProduct(validProduct);
    expect(getProductCount()).toBe(validProduct.quantity);
    expect(getTotal()).toBe(validProduct.price * validProduct.quantity);
  });

  it('doit maj produit déjà existant', () => {
    addProduct(validProduct);
    addProduct(validProduct);
    expect(getProductCount()).toBe(validProduct.quantity * 2);
  });

  it('doit supprimer un produit existant', () => {
    addProduct(validProduct);
    removeProduct(validProduct.id);
    expect(getProductCount()).toBe(0);
  });

  it('doit retourner le total du panier', () => {
    addProduct(validProduct);
    addProduct({ ...validProduct, id: 'p2', price: 50, quantity: 2 });
    expect(getTotal()).toBe(100 * 1 + 50 * 2);
  });

  it('doit appliquer une reduc valide', () => {
    addProduct(validProduct);
    applyDiscount('PROMO10');
    expect(getTotal()).toBeCloseTo(validProduct.price * 0.9 * validProduct.quantity);
  });

  it('doit mettre erreur pour un code promo invalide', () => {
    addProduct(validProduct);
    expect(() => applyDiscount('INVALID')).toThrow('Invalid discount code');
  });

  it("doit rejeter un produit avec prix negatif", () => {
    const invalidProduct = { ...validProduct, price: -20 };
    expect(() => addProduct(invalidProduct)).toThrow();
  });

  it("doit rejeter un produit avec 0 dde stock", () => {
    const invalidProduct = { ...validProduct, quantity: 0 };
    expect(() => addProduct(invalidProduct)).toThrow();
  });

});
