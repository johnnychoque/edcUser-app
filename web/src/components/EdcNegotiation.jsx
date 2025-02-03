import EdcTitle from "../utils/edcTitle.jsx";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/material';
import Polling from './Polling.jsx';
import { useState } from 'react';
import { Button } from '@mui/material'; 

const EdcNegotiation = () => {
  const [polling, setPolling] = useState(false);

  const handleButtonClick = () => {
    setPolling(true);
  };
  //console.log('Polling value:', polling);

  return (
    <div>
      <EdcTitle title="EDC Negotiation" />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>ContractNegotiationVerified Event</AlertTitle>
            DSP event verifying the success of the negotiation has been received.
        </Alert>
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>Role assigned to EDC Consumer</AlertTitle>
          Role has been assigned in FIWARE IDM.
        </Alert>
        <Alert severity="info">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Negotiation has finished</AlertTitle>
          Waiting for the start of <strong>EDC Transfer</strong> ...
        </Alert>
      </Stack>
      { polling === false &&
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
          redirectTo="/edctransferprovider"
          event="TransferProcessInitiated"
          pollInterval={3000}
        />)
      }
    </div>
  )
};

export default EdcNegotiation;