import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material'
import Start from './components/Start';
import User from './components/User';
import AssetTypes from './components/AssetTypes';
import CreateAsset from './components/CreateAsset';
import CreateProduct from './components/CreateProduct';
import CreateOffering from './components/CreateOffering';
import OfferingCreated from './components/OfferingCreated';
import OfferList from './components/OfferList';
import './App.css'
import { useAuthStore } from "./store/authStore";
import CreateOrder from './components/CreateOrder';
import OrderCreated from './components/OrderCreated';
import EdcSetup from './components/EdcSetup';
import EdcCatNeg from './components/EdcCatNeg';
import EdcTransferConsumer from './components/EdcTransferConsumer';
import EdcTransferProvider from './components/EdcTransferProvider';
import EdcNegotiation from './components/EdcNegotiation';
import EdcGetData from './components/EdcGetData';

function App() {
  const isProvider = useAuthStore(state => state.isProvider);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const getRoleInfo = () => {
    if (isAuthenticated === false) {
      return null;
    }
    if (isProvider === true) {
      return { text: "EDC Provider", color: "#64B5F6" };
    } else {
      return { text: "EDC Consumer", color: "#FF6B6B" };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div>
      <header>
      <Typography variant='h2'>
        Throttle Demo
      </Typography>
      {roleInfo && (
        <Typography sx={{ color: roleInfo.color }} variant="h4">
          {roleInfo.text}
        </Typography>
      )}
      </header>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/user' element={<User />} />
        <Route path='/assettypes' element={<AssetTypes />} />
        <Route path='/createasset' element={<CreateAsset />} />
        <Route path='/createproduct' element={<CreateProduct />} />
        <Route path='/createoffering' element={<CreateOffering />} />
        <Route path='/offeringcreated' element={<OfferingCreated />} />
        <Route path='/offerlist' element={<OfferList />} />
        <Route path='/createorder' element={<CreateOrder />} />
        <Route path='/ordercreated' element={<OrderCreated />} />
        <Route path='/edcsetup' element={<EdcSetup />} />
        <Route path='/edccatneg' element={<EdcCatNeg />} />
        <Route path='/edcnegotiation' element={<EdcNegotiation />} />
        <Route path='/edctransferconsumer' element={<EdcTransferConsumer />} />
        <Route path='/edctransferprovider' element={<EdcTransferProvider />} />
        <Route path='/edcgetdata' element={<EdcGetData />} />
      </Routes>
    </div>
  )
}

export default App
