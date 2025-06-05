import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const findItemIndex = (items, productId) =>
  items.findIndex((item) => item.id === productId);

const useBasketStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItemToBasket: (product) =>
        set((state) => {
          const itemIndex = findItemIndex(state.items, product.id);
          if (itemIndex > -1) {
            const updatedItems = state.items.map((item, index) =>
              index === itemIndex
                ? { ...item, quantityInBasket: item.quantityInBasket + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            return {
              items: [...state.items, { ...product, quantityInBasket: 1 }],
            };
          }
        }),

      removeItemFromBasket: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateItemQuantity: (productId, quantity) =>
        set((state) => {
          const newQuantity = Math.max(0, quantity);
          if (newQuantity === 0) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === productId
                ? { ...item, quantityInBasket: newQuantity }
                : item
            ),
          };
        }),

      incrementItemQuantity: (productId) =>
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === productId
                ? { ...item, quantityInBasket: item.quantityInBasket + 1 }
                : item
            ),
          };
        }),

      decrementItemQuantity: (productId) =>
        set((state) => {
          const itemIndex = findItemIndex(state.items, productId);
          if (itemIndex > -1) {
            const currentQuantity = state.items[itemIndex].quantityInBasket;
            if (currentQuantity <= 1) {
              return {
                items: state.items.filter((item) => item.id !== productId),
              };
            } else {
              return {
                items: state.items.map((item, index) =>
                  index === itemIndex
                    ? { ...item, quantityInBasket: item.quantityInBasket - 1 }
                    : item
                ),
              };
            }
          }
          return state; // اگر محصول یافت نشد، تغییری نده
        }),

      // محاسبه مجموع تعداد آیتم‌ها (نه نوع محصول، بلکه کل آیتم‌ها)
      getTotalItemsCount: () => {
        return get().items.reduce(
          (total, item) => total + item.quantityInBasket,
          0
        );
      },

      getBasketTotalAmount: () => {
        return get().items.reduce(
          (total, item) =>
            total + parseFloat(item.price) * item.quantityInBasket,
          0
        );
      },

      clearBasket: () => set({ items: [] }),
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBasketStore;
