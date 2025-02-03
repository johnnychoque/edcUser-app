import { create } from 'zustand';

export const useEdcTransferStore = create ((set) => ({
  agreementId: null,
  statusAgreement: null,
  transferId: null,
  statusTransfer: null,
  setAgreementId: (id) => set({ agreementId: id}),
  setStatusAgreement: (status) => set({ statusAgreement: status}),
  setTransferId:  (id) => set({ transferId: id}),
  setStatusTransfer: (status) => set({ statusTransfer: status})
}));