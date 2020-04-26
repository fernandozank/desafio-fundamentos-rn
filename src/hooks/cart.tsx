import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await AsyncStorage.getItem('GoMarket:Cart');
      response && setProducts(JSON.parse(response));
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const newProducts = [...products];
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex > -1) {
        newProducts[productIndex].quantity += 1;

        setProducts(newProducts);
      }
      await AsyncStorage.setItem('GoMarket:Cart', JSON.stringify(newProducts));
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productIndex = products.findIndex(p => p.id === id);
      let updateProducts = [...products];
      if (productIndex > -1) {
        if (products[productIndex].quantity === 1) {
          updateProducts = products.filter(product => product.id !== id);
        } else {
          updateProducts[productIndex].quantity -= 1;
        }

        setProducts(updateProducts);
      }

      await AsyncStorage.setItem(
        'GoMarket:Cart',
        JSON.stringify(updateProducts),
      );
    },
    [products],
  );

  const addToCart = useCallback(
    async (product: Omit<Product, 'quantity'>) => {
      const productIndex = products.findIndex(p => p.id === product.id);

      if (productIndex < 0) {
        const addProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
          quantity: 1,
        };
        const newProducts = [...products, addProduct];
        setProducts(newProducts);
        await AsyncStorage.setItem(
          'GoMarket:Cart',
          JSON.stringify(newProducts),
        );
      } else {
        increment(product.id);
      }
    },
    [products, increment],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
