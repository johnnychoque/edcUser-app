import axios from 'axios';
import { useOfferingStore } from '../store/offeringStore';
import { useAuthStore } from '../store/authStore';
import OrderParamsTable from './OrderParamsTable';
import config from '../config.js'
import { useOrderStore } from '../store/orderStore.js';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const selectedOffer = useOfferingStore(state => state.selectedOffer);
  const userData = useAuthStore(state => state.userData);
  const setOrderCreated = useOrderStore(state => state.setOrderCreated);
  const navigate = useNavigate();
  
  const orderParams = {
    offerId: selectedOffer.id,
    prodId: selectedOffer.productSpecification.id,
    userId: userData.id,
    userEmail: userData.email
  }
  console.log('orderParams', orderParams);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('orderUrl',config.api.host+':'+config.api.port+'/fiware/createorder');
      const response = await axios.post(
        config.api.host+':'+config.api.port+'/fiware/createorder', 
        orderParams,
        { withCredentials: true }
      );
      console.log('Order created ', response.data);
      setOrderCreated(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log('Llamando a OrderCreated');
    navigate('/ordercreated');
  }

  return (
    <div>
      <h2>Order Parameters</h2>
      <OrderParamsTable 
        params={orderParams}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default CreateOrder;

