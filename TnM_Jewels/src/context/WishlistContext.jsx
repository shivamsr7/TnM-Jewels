import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {
      toast("Already in Wishlist ❤️");
      return;
    }

    setWishlistItems((prev) => [...prev, product]);

    toast.success("Added to Wishlist ❤️");
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Removed from Wishlist");
  };

  const isWishlisted = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };
const clearWishlist = () => {
  setWishlistItems([]);
};
const moveAllToCart = (addToCart) => {
  wishlistItems.forEach((item) => {
    addToCart(item, 1);
  });

  setWishlistItems([]);

  toast.success("All items moved to cart 🛒");
};
  return (
<WishlistContext.Provider
value={{
  wishlistItems,
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
  clearWishlist,
  moveAllToCart,
}}
>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}