import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOfferingStore } from "../store/offeringStore"
import OfferListTable from './OfferListTable';
import { Button } from '@mui/material';

const OfferList = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const offerList = useOfferingStore(state => state.offerList);
  const selectedOffer = useOfferingStore(state => state.selectedOffer);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleButtonClick = () => {
    console.log('Llamando a CreateOrder');
    navigate('/createorder');
  };

  return (
    <div>
      <h2>Provider Offering List</h2>
      <OfferListTable data={offerList} />
      <Button 
        variant="contained" 
        color="primary" 
        disabled={!selectedOffer}
        onClick={handleButtonClick}
        sx={{ mt: 2 }}
      >
        Select Offering
      </Button>
    </div>
  );
};

export default OfferList;

