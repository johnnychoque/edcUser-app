import { handleAxiosError } from '../utils/errorHandler.js';
import config from '../config.js'
import axios from 'axios';
import { useEdcCatNegStore} from '../store/edcCatNegStore.js';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material'; 
import Polling from './Polling.jsx';
import EdcTitle from '../utils/edcTitle.jsx';

const EdcCatNeg = () => {
  const {
    statusContract, contractId, statusNegotiation, negotiationId,
    setContractId, setNegotiationId, setStatusContract, setStatusNegotiation
  } = useEdcCatNegStore();
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    const checkCatNeg = async () => {
      try {
        const respCat = await axios.post(
          config.api.host+':'+config.api.port+'/edc/fetchcatalog', 
          null,
          { withCredentials: true }
        );
        if (respCat.status === 200) {
          console.log('contract id',respCat.data)
          setContractId(respCat.data);
          setStatusContract('success');
        }
        try {
          const respNeg = await axios.post(
            config.api.host+':'+config.api.port+'/edc/startnegotiation', 
            respCat.data,
            { withCredentials: true }
          );
          if (respNeg.status === 200) {
            setNegotiationId(respNeg.data);
            setStatusNegotiation('success');
          }
        } catch (error) {
          setNegotiationId(false);
          setStatusNegotiation('error');
          handleAxiosError(error);
        }
      } catch (error){
        setContractId(false);
        setStatusContract('error');
        handleAxiosError(error);
      }
    };

    checkCatNeg();
  }, [setContractId, setNegotiationId, 
    setStatusContract, setStatusNegotiation]);

  const handleButtonClick = () => {
    setPolling(true);
  };

  return (
    <div>
      <EdcTitle title="EDC Catalog and Negotiation" />

      <Stack sx={{ width: '100%' }} spacing={2}>
      { statusContract === 'success' && contractId && ( 
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Catalog</AlertTitle>
          Retrieved catalog with id {contractId.contractOfferId}.
        </Alert>)
      } 
      { statusContract === 'error' && (
        <Alert severity="error">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Catalog</AlertTitle>
          There was an error getting catalog.
        </Alert>)
      }
      { statusNegotiation === 'success' && negotiationId && (
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Negotiation Started</AlertTitle>
          Negotiation phase started with id {negotiationId.contractNegotiationId}.
        </Alert>)
      } 
      { statusNegotiation === 'error' && (
        <Alert severity="error">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Negotiation</AlertTitle>
          There was an error in negotiation phase.
        </Alert>)
      }
      { statusContract === 'success' && statusNegotiation === 'success' &&
        (<Alert severity="info">
          <AlertTitle sx={{ textAlign: 'left' }}>Waiting for the end of EDC Negotiation</AlertTitle>
          Now <strong>EDC Provided</strong> is working on negotiation process ...
        </Alert>
        )
      }
      </Stack>

      { statusContract === 'success' && statusNegotiation === 'success' 
        && polling === false &&
        (<Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleButtonClick()}
          sx={{ mt: 2 }}
          >
          Continue
        </Button>)
      }
      { polling &&
        (<Polling 
          redirectTo="/edctransferconsumer"
          event="ContractNegotiationFinalized"
          pollInterval={3000}
        />)
      }

    </div>
  );
};

export default EdcCatNeg;

