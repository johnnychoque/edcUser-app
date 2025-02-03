import { create } from 'zustand';
import UseProductStore from './productStore';
import { useAuthStore } from './authStore';

const useAssetStore = create((set, get) => ({
  assetParameter: null,
  assetCreated: null,
  assetTypeList: null,
  selectedAssetType: null,
  setAssetParameter: (param) => set({ assetParameter: param }),
  setAssetTypeList: (types) => set({ assetTypeList: types }),
  setSelectedAssetType: (type) => set({ selectedAssetType: type }),
  setAssetCreated: (asset) => {
    set({ assetCreated: asset });
    const { selectedAssetType } = get();
    const productStore = UseProductStore.getState();
    const authStore = useAuthStore.getState();
    const combinedData = {
      content: asset.content,
      contentType: asset.contentType,
      assetId: asset.id,
      assetType: selectedAssetType ? selectedAssetType.name : null,
      ownerId: authStore.userData.id
    };
    productStore.setProductParameter(combinedData);
  }
}));

export default useAssetStore;
