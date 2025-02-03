import { create } from 'zustand';

export const useOfferingStore = create((set) => ({
  offering: null,
  offerList: null,
  selectedOffer: null,
  setOffering: (offer) => set({ offering: offer}),
  setOfferList: (list) => set({ offerList: list}),
  setSelectedOffer: (offer) => set({ selectedOffer: offer})
}));
