import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  imageUrl?: string;
  category?: string;
  categoryName?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: {
    id: string | number;
    name: string;
    price?: number;
    calculatedPrice?: number;
    image_url?: string;
    category?: string;
    categoryName?: string;
  }, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jewelcart_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('jewelcart_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: {
    id: string | number;
    name: string;
    price?: number;
    calculatedPrice?: number;
    image_url?: string;
    imageUrl?: string;
    category?: string;
    categoryName?: string;
  }, quantity: number = 1) => {
    const price = product.calculatedPrice || product.price || 0;
    const existingItemIndex = items.findIndex(item => item.productId === product.id);

    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      setItems(prevItems => {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      });
      toast({
        title: "Item updated in cart",
        description: `Increased quantity of ${product.name} by ${quantity}`,
      });
    } else {
      // New item, add to cart
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        productId: product.id,
        name: product.name,
        price: price,
        quantity: quantity,
        image_url: product.image_url || product.imageUrl,
        category: product.category || product.categoryName,
      };

      setItems(prevItems => [...prevItems, newCartItem]);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart`,
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === itemId);
      const newItems = prevItems.filter(item => item.id !== itemId);

      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.name} has been removed from your cart`,
        });
      }

      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};