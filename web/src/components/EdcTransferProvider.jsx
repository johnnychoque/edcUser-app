import EdcTitle from "../utils/edcTitle";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/material';

const EdcTransferProvider = () => {

  return (
    <div>
      <EdcTitle title="EDC Transfer" />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>TransferProcessInitiated Event</AlertTitle>
            DSP event verifying the start of the transfer has been received.
        </Alert>
        <Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>Checked the role assigned</AlertTitle>
          EDC Consumer has the role in FIWARE IDM.
        </Alert>
        <Alert severity="info">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Transfer has finished</AlertTitle>
          EDC process has been completed on Provider side.
        </Alert>
        <Alert variant="outlined" severity="info">
          End of the Throttle Demo.
        </Alert>
      </Stack>
    </div>
  )
};

export default EdcTransferProvider;