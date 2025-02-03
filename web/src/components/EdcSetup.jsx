import EdcAssetTable from "./EdcAssetTable";
import { Button } from '@mui/material'; 
import { Typography } from '@mui/material';
import { handleAxiosError } from '../utils/errorHandler';
import axios from 'axios';
import config from '../config.js';
import UseEdcSetupStore from "../store/edcSetupStore.js";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useOfferingStore } from "../store/offeringStore";
import UseProductStore from "../store/productStore";
import Polling from "./Polling.jsx";
import { useState } from 'react';
import EdcTitle from "../utils/edcTitle.jsx";

const EdcSetup = () => {
  const setAssetCreated = UseEdcSetupStore(state => state.setAssetCreated);
  const assetCreated = UseEdcSetupStore(state => state.assetCreated);
  const setPolicyCreated = UseEdcSetupStore(state => state.setPolicyCreated);
  const policyCreated = UseEdcSetupStore(state => state.policyCreated);
  const setContractCreated = UseEdcSetupStore(state => state.setContractCreated);
  const contractCreated = UseEdcSetupStore(state => state.contractCreated);
  const offering = useOfferingStore(state => state.offering);
  const productParameter = UseProductStore(state => state.productParameter);
  const [polling, setPolling] = useState(false);

  let baeProd = {
    id: offering.id,
    name: offering.name,
    description: offering.description,
    content: productParameter.content,
    contenttype: productParameter.contentType
  };

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);

    event.preventDefault();
    baeProd.provDataUrl = formData.get('provDataUrl');
    try {
      const respAsset = await axios.post(
        config.api.host+':'+config.api.port+'/edc/createasset', 
        baeProd,
        { withCredentials: true }
      );
      setAssetCreated(respAsset.status === 200);
      try {
        const respPol = await axios.post(
          config.api.host+':'+config.api.port+'/edc/createpolicy', 
          null,
          { withCredentials: true }
        );
        setPolicyCreated(respPol.status === 200);
        try {
          const respCont = await axios.post(
            config.api.host+':'+config.api.port+'/edc/createcontract', 
            null,
            { withCredentials: true }
          );
          setContractCreated(respCont.status === 200);
        } catch (error) {
          setContractCreated(false);
          handleAxiosError(error);
        };
      } catch (error) {
        setPolicyCreated(false);
        handleAxiosError(error);
      };
    } catch (error) {
      setAssetCreated(false);
      handleAxiosError(error);
    }
  };

  const pollingButtonClick = () => {
    setPolling(true);
  };

  return (
    <div>
      <EdcTitle title="EDC Setup" />

      {(assetCreated === null) && (
        <div>
        <Typography sx={{ color: 'text.primary',
            marginBottom: '0.5em' }} variant="h6">
            Create EDC Asset
        </Typography>
        <EdcAssetTable prod={baeProd} onSubmit={handleSubmit} />
        </div>
      )}

      <Stack sx={{ width: '100%' }} spacing={2}>
      {(assetCreated === true) && 
        (<Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Asset</AlertTitle>
          It has been successfully created.
        </Alert>)
      }
      {(assetCreated === false) &&   
        (<Alert severity="error">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Asset</AlertTitle>
          There was an error creating EDC asset.
        </Alert>)
      }
      {(policyCreated === true) && 
        (<Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Policy</AlertTitle>
          It has been successfully created.
        </Alert>)
      }
      {(policyCreated === false) && 
        (<Alert severity="error">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Policy</AlertTitle>
          There was an error creating EDC policy.
        </Alert>)
      }
      {(contractCreated === true) &&
        (<Alert severity="success">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Contract</AlertTitle>
          It has been successfully created.
        </Alert>)
      } 
      {(contractCreated === false) &&
        (<Alert severity="error">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Contract</AlertTitle>
          There was an error creating EDC contract.
        </Alert>)
      }
      {contractCreated && 
        (<Alert severity="info">
          <AlertTitle sx={{ textAlign: 'left' }}>EDC Setup has finished</AlertTitle>
          Waiting for the start of <strong>EDC Negotiation</strong> ...
        </Alert>)
      }
      { contractCreated && polling === false &&
        (<Button 
          variant="contained" 
          color="primary" 
          onClick={() => pollingButtonClick()}
          sx={{ mt: 2 }}
          >
          Continue
        </Button>)
      }
      {polling && 
        (<Polling 
          redirectTo="/edcnegotiation"
          event="ContractNegotiationVerified"
          pollInterval={3000}
        />)
      }
      </Stack>
    </div>
  )
}

export default EdcSetup;

