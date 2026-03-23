import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface WishlistItem {
  id: string | number;
  name: string;
  price?: number;
  calculatedPrice?: number;
  imageUrl?: string;
  image_url?: string;
  primary_image?: string;
  category?: string;
  categoryName?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  toggleWishlist: (product: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('jewelcart_wishlist');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jewelcart_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id)) return;
    setItems(prev => [...prev, {
      id: product.id,
      name: product.name,
      price: product.price,
      calculatedPrice: product.calculatedPrice,
      imageUrl: product.imageUrl,
      image_url: product.image_url,
      primary_image: product.primary_image,
      category: product.category,
      categoryName: product.categoryName,
    }]);
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  const removeFromWishlist = (productId: string | number) => {
    setItems(prev => {
      const item = prev.find(i => String(i.id) === String(productId));
      if (item) {
        toast({
          title: "Removed from wishlist",
          description: `${item.name} has been removed from your wishlist`,
        });
      }
      return prev.filter(i => String(i.id) !== String(productId));
    });
  };

  const isInWishlist = (productId: string | number) => {
    return items.some(i => String(i.id) === String(productId));
  };

  const toggleWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
