import axios from 'axios'
import edc from '../config/edc.js'

const headers = { headers: {
  'content-type' : 'application/json'
}};

const handleApiError = (error, next, customErrorMessage) => {
  if (error.response) {
    const customError = new Error(customErrorMessage || 'Error en la llamada al API');
    customError.status = error.response.status;
    customError.responseBody = error.response.data;
    next(customError);
  } else if (error.request) {
    console.log(error.request);
    next(new Error('No se recibió respuesta del servidor'));
  } else {
    console.log('Error', error.message);
    next(error);
  }
};

export class EdcController {

  static async createAsset (req, res, next) {
    console.log('createAsset');
    console.log('Prod info', req.body);
    try {
      console.log('headers ', headers);
      const response = await axios.post(
        edc.url.asset, 
        edc.body.asset(req.body), 
        headers
      )
      console.log('CreateAsset', response.status);
      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        res.status(response.status).json(response.data);
      } else {
        console.log('Error CreateAsset', response.status)
      }
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC createAsset'
      );
    }
  }

  static async createPolicy (req, res, next) {
    try {
      const response = await axios.post(edc.url.policy, edc.body.policy, headers)
      console.log('CreatePolicy',response.status)
      if (response.status == 200) {
        console.log(response.data);
        res.status(response.status).json(response.data);
      } else {
        console.log('Error CreatePolicy', response.status);
      }
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC createPolicy'
      );
    }
  }

  static async createContract (req, res, next) {
    try {
      const response = await axios.post(edc.url.contract, edc.body.contract, headers);
      console.log('CreateContract',response.status);
      if (response.status == 200) {
        console.log(response.data);
        res.status(response.status).json(response.data);
      } else {
        console.log('Error CreateContract', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC createContract'
      );
    }
  }

  static async fetchCatalog (req, res, next) {
    try {
      console.log('---> fetchCatalog');
      const response = await axios.post(edc.url.catalog, edc.body.catalog, headers);
      console.log('fetchCatalog',response.status);
      if (response.status == 200) {
        console.log(JSON.stringify(response.data, null, 2));
        const contractOfferId = response.data["dcat:dataset"]["odrl:hasPolicy"]["@id"];
        console.log('contractOfferId:', contractOfferId);
        res.status(response.status).json({ contractOfferId: contractOfferId });
      } else {
        console.log('Error fetchCatalog', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC fetchCatalog'
      );
    }
  }

  static async startNegotiation (req, res, next) {
    console.log('---> startNegotiation');
    console.log('contract id',req.body.contractOfferId);
    console.log('negotiation body',edc.body.negotiation(req.body.contractOfferId));
    try {
      const response = await axios.post(
        edc.url.negotiation, 
        edc.body.negotiation(req.body.contractOfferId), 
        headers
      );
      console.log('startNegotiation',response.status);
      if (response.status == 200) {
        console.log(response.data);
        const contractNegotiationId = response.data["@id"];
        console.log('contractNegotiationId:', contractNegotiationId);
        //res.status(response.status).json(response.data);
        res.status(response.status).json({ contractNegotiationId: contractNegotiationId });
      } else {
        console.log('Error startNegotiation', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC startNegotiation'
      );
    }
  }

  static async getAgreementId (req, res, next) {
    const { negotiationid } = req.query;
    console.log('---> getAgreementId');
    console.log('negotiationid', negotiationid);
    try {
      const response = await axios.get(
        edc.url.agreement(negotiationid), 
        headers
      );
      console.log('getAgreementId',response.status);
      if (response.status == 200) {
        console.log(response.data);
        const contractAgreementId = response.data["contractAgreementId"];
        console.log('contractAgreementId:', contractAgreementId);
        res.status(response.status).json({ contractAgreementId: contractAgreementId });
      } else {
        console.log('Error getAgreementId', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC getAgreementId'
      );
    }
  }

  static async startTransfer (req, res, next) {
    console.log('---> startTransfer');
    console.log('startTransfer', req.body);
    try {
      console.log(req.body.contractAgreementId);
      const response = await axios.post(
        edc.url.transfer, 
        edc.body.transfer(req.body.contractAgreementId), 
        headers
      );
      console.log('startTransfer',response.status);
      if (response.status == 200) {
        console.log(response.data);
        const transferProcessId = response.data["@id"];
        console.log('transferProcessId:', transferProcessId);
        res.status(response.status).json({ transferProcessId: transferProcessId });
      } else {
        console.log('Error startTransfer', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC startTransfer'
      );
    }
  }

  static async pullData (req, res, next) {
    const { transferid } = req.query;

    console.log('---> getEdr');
    console.log('TransferId recibida:', transferid);

    try {
      const respEdr = await axios.get(
        edc.url.edr(transferid), headers
      );
      console.log('getEdr status:',respEdr.status);

      if (respEdr.status !== 200) {
        console.log('Error getEdr', respEdr.status);
        return res.status(respEdr.status).json({ error: 'Error obteniendo EDR' });
      }

      const authorization = respEdr.data["authorization"];
      if (!authorization) {
        console.log('No se recibió autorización');
        return res.status(400).json({ error: 'No se recibió autorización' });
      }
  
      console.log('Autorización recibida');
      
      console.log('---> pullData');
      const pullHeaders = {
        headers: {
          ...headers.headers,
          'Authorization': authorization
        }
      };
      console.log('Pull Headers:',pullHeaders);

      const respPull = await axios.get(edc.url.pull, pullHeaders);
      console.log('pullData status:',respPull.status);

      if (respPull.status !== 200) {
        console.log('Error pullData', respPull.status);
        return res.status(respPull.status).json({ error: 'Error en pullData' });
      }

      return res.status(200).json(respPull.data);

    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API EDC pullData'
      );
    };
  }

}
