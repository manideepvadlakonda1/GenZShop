import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      
      addToWishlist: (product) => {
        const { wishlistItems } = get()
        const existingItem = wishlistItems.find(item => item._id === product._id)
        
        if (!existingItem) {
          set({ wishlistItems: [...wishlistItems, product] })
        }
      },
      
      removeFromWishlist: (productId) => {
        set({ wishlistItems: get().wishlistItems.filter(item => item._id !== productId) })
      },
      
      isInWishlist: (productId) => {
        return get().wishlistItems.some(item => item._id === productId)
      },
      
      clearWishlist: () => {
        set({ wishlistItems: [] })
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
)
