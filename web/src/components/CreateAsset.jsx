import useAssetStore from '../store/assetStore';
import { Navigate, useNavigate } from 'react-router-dom';
//import { TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import AssetParametersTable from './AssetParametersTable';
import config from '../config.js'

const CreateAsset = () => {
  const selectedAssetType = useAssetStore(state => state.selectedAssetType);
  const setAssetCreated = useAssetStore(state => state.setAssetCreated);
  const setAssetParameter = useAssetStore(state => state.setAssetParameter);

  const navigate = useNavigate();

  if (!selectedAssetType) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const assetParameter = {
      resourceType: selectedAssetType.name,
      content: formData.get('content'),
      contentType: formData.get('contentType')
    };
    setAssetParameter(assetParameter);
    console.log('Asset Parameter saved:', assetParameter);
    try {
      const response = await axios.post(
        config.api.host+':'+config.api.port+'/fiware/createasset', 
        assetParameter, 
        { withCredentials: true }
      );
      console.log('Asset created:', response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      setAssetCreated(response.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.log(error.request);
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
    console.log('Llamando a CreateProduct');
    navigate('/createproduct');
  };

  return (
    <div>
      <h2>Asset Parameters</h2>
      <AssetParametersTable 
        selectedAssetType={selectedAssetType}
        onSubmit={handleSubmit}
      />
    </div>
  );

};

export default CreateAsset;
