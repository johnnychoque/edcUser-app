import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AssetTypeTable from './AssetTypeTable';
import { Button } from '@mui/material';
import useAssetStore from '../store/assetStore';

const AssetTypes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const assetTypeList = useAssetStore(state => state.assetTypeList);
  const selectedAssetType = useAssetStore(state => state.selectedAssetType);
  const navigate = useNavigate();

  // Intenta autenticar si aún no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  console.log('Componente Asset type list ', assetTypeList);

  const handleButtonClick = () => {
    console.log('Llamando a CreateAsset');
    navigate('/createasset');
  };
  
  return (
    <div>
      <h2>Asset Types</h2>
      <AssetTypeTable data={assetTypeList} />
      <Button 
        variant="contained" 
        color="primary" 
        disabled={!selectedAssetType}
        onClick={handleButtonClick}
        sx={{ mt: 2 }}
      >
        Select Asset Type
      </Button>
    </div>
  );
};

export default AssetTypes;
