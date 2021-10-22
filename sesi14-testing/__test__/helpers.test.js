const { incrementQty, decrementQty } = require('./../simple-cart-app/src/helpers.js');

describe('Test Increment', () => {
  test('Increment Bilangan positif', () => {
    expect(incrementQty(6)).toBe(7);
  })
  
  test('Increment Bilangan negatif', () => {
    expect(incrementQty(-7)).toBe(-6);
  });
});

describe('Test Decrement', () => {
  test('Decrement Bilangan positif', () => {
    expect(decrementQty(9)).toBe(8);
  })
  
  test('Decrement Bilangan negatif', () => {
    expect(decrementQty(-4)).toBe(-5);
  });
});