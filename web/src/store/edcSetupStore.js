import { create } from 'zustand';

const UseEdcSetupStore = create((set) => ({
  assetCreated: null,
  policyCreated: null,
  contractCreated: null,
  setAssetCreated: (val) => set({ assetCreated: val}),
  setPolicyCreated: (val) => set({ policyCreated: val}),
  setContractCreated: (val) => set({ contractCreated: val})
}));

export default UseEdcSetupStore;