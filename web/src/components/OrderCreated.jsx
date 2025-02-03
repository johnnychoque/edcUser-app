import { useOrderStore } from '../store/orderStore.js';
import OrderCreatedTable from './OrderCreatedTable.jsx';
import { useNavigate } from 'react-router-dom';

const OrderCreated = () => {
  const orderCreated = useOrderStore(state => state.orderCreated);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Llamando a edccatneg');
    navigate('/edccatneg');
  }

  return (
    <div>
      <h2>Order Created</h2>
      <OrderCreatedTable 
        order={orderCreated}
        onSubmit={handleSubmit}
      />
  </div>
  )
};

export default OrderCreated;

