import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orderCreated: null,
  setOrderCreated: (order) => set({ orderCreated: order})
}));
