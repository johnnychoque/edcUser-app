import { useState, useEffect } from 'react';
import EdcTitle from '../utils/edcTitle.jsx';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import JSONViewer from '../utils/jsonViewer.jsx';
import axios from 'axios';
import config from '../config.js'
import { useEdcTransferStore } from "../store/edcTransferStore.js";
import { handleAxiosError } from '../utils/errorHandler.js';

const EdcGetData = () => {
  const [dataProv, setDataProv] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [error, setError] = useState(null);
  const transferId = useEdcTransferStore(state => state.transferId);

  useEffect(() => {
    const fetchData = async () => {
      if (!transferId?.transferProcessId) return;

      setStatus('loading');
      try {
        const respPull = await axios.get(
          `${config.api.host}:${config.api.port}/edc/pulldata?transferid=${transferId.transferProcessId}`,
          { withCredentials: true, }
        );
        console.log('Provider Data:', respPull.data);
        setDataProv(respPull.data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setError(error);
        handleAxiosError(error);
      }
    };

    fetchData();
  }, [transferId?.transferProcessId]);

  return (
    <div>
      <EdcTitle title="EDC Get Data" />
      <Stack sx={{ width: '100%' }} spacing={2}>
        {status === 'loading' && (
          <Alert severity="info">
            <AlertTitle sx={{ textAlign: 'left' }}>Loading</AlertTitle>
            Fetching data...
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error">
            <AlertTitle sx={{ textAlign: 'left' }}>Error</AlertTitle>
            There was an error fetching data: {error?.message}
          </Alert>
        )}
      </Stack>
      {status === 'success' && (
        <>
          <Alert severity="success">
            <AlertTitle sx={{ textAlign: 'left' }}>Get Data</AlertTitle>
            EDC Provider data successfully obtained.
          </Alert>
          <JSONViewer data={dataProv} />
          <Alert variant="outlined" severity="info" sx={{ mt: 2 }} >
            End of the Throttle Demo.
          </Alert>
        </>
      )}
    </div>
  );
}

export default EdcGetData;

