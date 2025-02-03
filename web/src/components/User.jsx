import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";
import UserTable from './UserTable';
import { Button, CircularProgress } from '@mui/material'; 
import axios from 'axios';
import useAssetStore from '../store/assetStore';
import config from '../config.js'
import { useOfferingStore } from "../store/offeringStore"

const User = () => {
  const { isAuthenticated, userData, checkAndSetAuth, isProvider } = useAuthStore();
  const navigate = useNavigate();
  const setAssetTypeList = useAssetStore(state => state.setAssetTypeList);
  const [loading, setLoading] = useState(true);
  const setOfferList = useOfferingStore(state => state.setOfferList);

  useEffect(() => {
    const authenticate = async () => {
      if (!isAuthenticated) {
        const authSuccess = checkAndSetAuth();
        if (!authSuccess) {
          navigate('/');
        }
      }
      setLoading(false);
    };

    authenticate();
  }, [isAuthenticated, checkAndSetAuth, navigate]);

  const handleButtonClick = async (isProvider) => {
    if (isProvider) {
      try {
        const response = await axios.get(
          config.api.host+':'+config.api.port+'/fiware/assettypes',
          { withCredentials: true }
        );
        console.log('Asset types:', response.data);
        await setAssetTypeList(response.data);
        console.log('Llamando a AssetTypes');
        navigate('/assettypes');
      } catch (error) {
        console.error('Error fetching asset types:', error);
      }
    } else {
      try {
        const response = await axios.get(
          config.api.host+':'+config.api.port+'/fiware/offerlist',
          { withCredentials: true }
        );
        console.log('Offer List:', response.data);
        await setOfferList(response.data);
        console.log('Llamando a offer list');
        navigate('/offerlist')
      } catch (error) {
        console.error('Error fetching offering:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Authenticated User</h2>
      {userData && <UserTable data={userData} />}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleButtonClick(isProvider)}
        sx={{ mt: 2 }}
      >
        Continue
      </Button>
    </div>
  );
};

export default User;

