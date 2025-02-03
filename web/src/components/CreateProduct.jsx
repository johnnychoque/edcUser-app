import UseProductStore from '../store/productStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductParametersTable from './ProductParametersTable';
import config from '../config.js'

const CreateProduct = () => {
  const productParameter = UseProductStore(state => state.productParameter);
  //const setProductParameter = UseProductStore(state => state.setProductParameter);
  const setProductId = UseProductStore(state => state.setProductId);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const productParams = {
      content: productParameter.content,
      contentType: productParameter.contentType,
      assetId: productParameter.assetId,
      assetType: productParameter.assetType,
      ownerId: productParameter.ownerId,
      productName: formData.get('productName')
    };

    event.preventDefault();
    //await setProductParameter(productParams); <-- al parecer no es necesario guardar los parametros del producto
    console.log('Prod param ', productParams);
    //console.log('product Parameters saved:', productParameter);
    try {
      const response = await axios.post(
        config.api.host+':'+config.api.port+'/fiware/createproduct', 
        productParams,
        { withCredentials: true }
      );
      console.log('Product Id created:', response.data.id);
      // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      setProductId(response.data.id);
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
    console.log('Llamando a CreateOffering');
    navigate('/createoffering');
  };

  return (
    <div>
      <h2>Product Parameters</h2>
      <ProductParametersTable 
        productParameter={productParameter}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default CreateProduct;
