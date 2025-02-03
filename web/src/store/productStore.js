import { create } from 'zustand';

const UseProductStore = create((set) => ({
  productParameter: null,
  productCreated: null,
  productId: null,
  setProductParameter: (param) => set({ productParameter: param }),
  setProductCreated: (prod) => set({ productCreated: prod }),
  setProductId: (id) => set({ productId: id })
}));

export default UseProductStore;