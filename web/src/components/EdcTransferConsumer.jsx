import EdcTitle from "../utils/edcTitle";
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from '@mui/material'; 
import { handleAxiosError } from '../utils/errorHandler.js';
import axios from 'axios';
import config from '../config.js'
import { useEdcCatNegStore} from '../store/edcCatNegStore.js';
import { useEdcTransferStore } from "../store/edcTransferStore.js";
import Polling from './Polling.jsx';
import { useState, useEffect } from 'react';

const EdcTransferConsumer = () => {
  const negotiationId = useEdcCatNegStore(state => state.negotiationId);
  const { setAgreementId, setStatusAgreement, setTransferId, setStatusTransfer } = useEdcTransferStore();
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [error, setError] = useState(null);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    const checkAgreeTrans = async () => {
      if (!negotiationId?.contractNegotiationId) return;

      setStatus('loading');
      try {
        const respAgree = await axios.get(
          `${config.api.host}:${config.api.port}/edc/getagreementid?negotiationid=${negotiationId.contractNegotiationId}`,
          { withCredentials: true }
        );
        console.log('Agreement id', respAgree.data);
        setAgreementId(respAgree.data);
        setStatusAgreement('success');

        const respTrans = await axios.post(
          `${config.api.host}:${config.api.port}/edc/starttransfer`, 
          respAgree.data,
          { withCredentials: true }
        );
        console.log('Transfer id', respTrans.data);
        setTransferId(respTrans.data);
        setStatusTransfer('success');
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setError(error);
        setAgreementId(false);
        setStatusAgreement('error');
        setTransferId(false);
        setStatusTransfer('error');
        handleAxiosError(error);
      }
    };

    checkAgreeTrans();
  }, [negotiationId?.contractNegotiationId, setAgreementId, setStatusAgreement, setTransferId, setStatusTransfer]);

  const handleButtonClick = () => {
    setPolling(true);
  };
  
  return (
    <div>
      <EdcTitle title="EDC Transfer" />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info">
          <AlertTitle sx={{ textAlign: 'left' }}>ContractNegotiationFinalized Event</AlertTitle>
          DSP event verifying the end of negotiation has been received.
        </Alert>
        {status === 'loading' && (
          <Alert severity="info">
            <AlertTitle sx={{ textAlign: 'left' }}>Processing</AlertTitle>
            Fetching agreement and starting transfer...
          </Alert>
        )}
        {status === 'success' && (
          <>
            <Alert severity="success">
              <AlertTitle sx={{ textAlign: 'left' }}>EDC Agreement</AlertTitle>
              Agreement reached and transfer process started.
            </Alert>
            <Alert severity="info">
              <AlertTitle sx={{ textAlign: 'left' }}>Waiting for the end of EDC Transfer</AlertTitle>
              Now <strong>EDC Provided</strong> is working on transfer process ...
            </Alert>
          </>
        )}
        {status === 'error' && (
          <Alert severity="error">
            <AlertTitle sx={{ textAlign: 'left' }}>Error</AlertTitle>
            An error occurred: {error?.message}
          </Alert>
        )}
      </Stack>

      {status === 'success' && !polling && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleButtonClick}
          sx={{ mt: 2 }}
        >
          Continue
        </Button>
      )}
      {polling && (
        <Polling 
          redirectTo="/edcgetdata"
          event="TransferProcessStarted"
          pollInterval={3000}
        />
      )}
    </div>
  );
};

export default EdcTransferConsumer;

