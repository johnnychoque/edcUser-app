import { create } from 'zustand';

export const useEdcCatNegStore = create((set) => ({
  statusContract: null,
  contractId: null,
  statusNegotiation: null,
  negotiationId: null,
  setContractId: (id) => set({ contractId: id}),
  setNegotiationId: (id) => set({ negotiationId: id}),
  setStatusContract: (stat) => set({ statusContract: stat}),
  setStatusNegotiation: (stat) => set({ statusNegotiation: stat})
}));
