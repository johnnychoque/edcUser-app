import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseProductStore from "../store/productStore";
import OfferingParamsTable from "./OfferingParamsTable";
import { useOfferingStore } from '../store/offeringStore';
import config from '../config.js'

const CreateOffering = () => {
  const productId = UseProductStore(state => state.productId);
  const setOffering = useOfferingStore(state => state.setOffering);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const offeringParams = {
      offerDesc: formData.get('offeringDesc'),
      offerName: formData.get('offeringName'),
      productId: productId
    }
    event.preventDefault();
    console.log('Offer parameters ', offeringParams);
    try {
      const response = await axios.post(
        config.api.host+':'+config.api.port+'/fiware/createoffering', 
        offeringParams,
        { withCredentials: true }
      );
      console.log('Offering created ', response.data);
      setOffering(response.data);
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
    console.log('Llamando a OfferingCreated');
    navigate('/offeringcreated');
  };

  return (
    <div>
      <h2>Offering Parameters</h2>
      <OfferingParamsTable 
        productId={productId}
        onSubmit={handleSubmit}
      />
    </div>
  )

};

export default CreateOffering;
