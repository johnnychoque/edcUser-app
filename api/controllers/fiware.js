import axios from 'axios'
import fiware from '../config/fiware.js'

const handleApiError = (error, next, customErrorMessage) => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    // Crear un error personalizado con la información relevante
    const customError = new Error(customErrorMessage || 'Error en la llamada al API');
    customError.status = error.response.status;
    customError.responseBody = error.response.data;
    // Pasar el error personalizado al ErrorHandler
    next(customError);
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    console.log(error.request);
    next(new Error('No se recibió respuesta del servidor'));
  } else {
    // Algo sucedió en la configuración de la solicitud que provocó un error
    console.log('Error', error.message);
    next(error);
  }
};

export class FiwareController {

  static async getAssetTypes (req, res, next) {
    if (!req.isAuthenticated()) {
      console.log("No esta autenticado ...");
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      console.log('getAssetTypes begin');
      const headers = { headers: req.customHeaders };
      console.log('headers ', headers);
      console.log('url ', fiware.url.assetTypes);
      const response = await axios.get(fiware.url.assetTypes, headers);
      if (response.status == 200) {
        //console.log(response.data);
        res.status(200).json(response.data);
      } else {
        console.log('Error Upload Asset', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware getAssetTypes'
      );
    }
  }

  static async createAsset (req, res, next) {
    console.log('Received JSON in createAsset:');
    console.log(JSON.stringify(req.body, null, 2));
  
    try {
      // const value = fiware.getAssetBody(); <-- no es necesario porque req.body tiene el json adecuado
      const headers = { headers: req.customHeaders };
      const response = await axios.post(fiware.url.asset, req.body, headers);
      console.log('Create Asset status ',response.status);
      if (response.status == 200) {
        console.log('Datos del Asset creado')
        //console.log(JSON.stringify(response.data, null, 2));
        res.status(200).json(response.data);
      } else {
        console.log('Error Upload Asset', response.status);
        res.status(response.status).json({
          message: 'Error creating asset',
          status: response.status
        });
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware createAsset'
      );
    }
  }

  static async createProduct (req, res, next) {
    console.log('Received JSON in createProduct:');
    console.log(JSON.stringify(req.body, null, 2));
    try {
      const productBody = fiware.getProductBody(req.body);
      console.log('Product Body');
      console.log(JSON.stringify(productBody, null, 2));
      console.log('url',fiware.url.product);
      const headers = { headers: req.customHeaders };
      console.log('headers', headers);
      const response = await axios.post(fiware.url.product, productBody, headers);
      console.log('Create Product status',response.status);
      if (response.status == 201) {
        console.log('Producto creado');
        console.log(JSON.stringify(response.data, null, 2));
        res.status(201).json(response.data);
      } else {
        console.log('Error Creating Product', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware createProduct'
      );
    }
  }

  static async createOffering (req, res, next) {
    console.log('Received JSON in createOffer:');
    console.log(JSON.stringify(req.body, null, 2));
    try {
      const offerBody = fiware.getOfferBody(req.body);
      console.log('Offering body');
      console.log(JSON.stringify(offerBody, null, 2));
      console.log('url catalog',fiware.url.catalog);
      const headers = { headers: req.customHeaders };
      console.log('headers', headers);
      const respCat = await axios.get(fiware.url.catalog, headers);
      //console.log('Catalogo recibido');
      //console.log(JSON.stringify(respCat.data, null, 2));
      const catId = respCat.data[0].id;
      console.log('Catalog Id', catId)
      const response = await axios.post(fiware.getOfferUrl(catId), offerBody, headers);
      console.log('Create Offer status',response.status);
      if (response.status == 201) {
        console.log('Offering created');
        console.log(JSON.stringify(response.data, null, 2));
        res.status(201).json(response.data);
      } else {
        console.log('Error Creating Offering', response.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware createOffering'
      );
    }
  }

  static async getOfferList (req, res, next) {
    try {
      const headers = { headers: req.customHeaders };
      console.log('headers', headers);
      const respCat = await axios.get(fiware.url.catalog, headers);
      const catId = respCat.data[0].id;
      const offerListUrl = fiware.getOfferUrl(catId) + '?lifecycleStatus=launched';

      console.log('offerListUrl',offerListUrl)
      const respList = await axios.get(offerListUrl, headers);
      if (respList.status == 200) {
        console.log('Offering list');
        //console.log(JSON.stringify(respList.data, null, 2));
        res.status(200).json(respList.data);
      } else {
        console.log('Error Offering List', respList.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware getOfferList'
      );
    }
  }

  static async createOrder (req, res, next) {
    const orderParams = {
      offerId: req.body.offerId,
      prodId: req.body.prodId,
      userId: req.body.userId,
      userEmail: req.body.userEmail
    };
    console.log('orderParams 1', orderParams);
    const prodUrl = fiware.url.product+'/'+ orderParams.prodId;
    console.log('Prod Url', prodUrl);
    try {
      const headers = { headers: req.customHeaders };
      console.log('Product headers', headers);
      const respProd = await axios.get(prodUrl, headers);
      console.log('Get Product status', respProd.status);
      //console.log(JSON.stringify(respProd.data, null, 2));
      orderParams.assetType = respProd.data.productSpecCharacteristic[0].productSpecCharacteristicValue[0].value;
      orderParams.contentType = respProd.data.productSpecCharacteristic[1].productSpecCharacteristicValue[0].value;
      orderParams.content = respProd.data.productSpecCharacteristic[2].productSpecCharacteristicValue[0].value;
      orderParams.assetId = respProd.data.productSpecCharacteristic[3].productSpecCharacteristicValue[0].value;
      console.log('orderParams', orderParams);
      console.log('billing url',fiware.url.billing);
      console.log('Billing headers', headers);
      const respBill = await axios.get(fiware.url.billing, headers);
      console.log('Get Billing status', respBill.status);
      console.log(JSON.stringify(respBill.data, null, 2));
      const { id } = respBill.data.find(item => item.name === orderParams.userId) || {};
      orderParams.billId = id;
      const respCat = await axios.get(fiware.url.catalog, headers);
      orderParams.catId = respCat.data[0].id;
      console.log('orderParams 2', orderParams);

      const orderBody = fiware.getOrderBody(orderParams);
      console.log('orderBody', JSON.stringify(orderBody, null, 2));
      console.log('url order',fiware.url.order)
      const respOrder = await axios.post(fiware.url.order, orderBody, headers);
      console.log('Create Order status',respOrder.status);
      if (respOrder.status == 201) {
        console.log('Order created');
        console.log(JSON.stringify(respOrder.data, null, 2));
        res.status(201).json(respOrder.data);
      } else {
        console.log('Error Creating Order', respOrder.status);
      } 
    } catch (error) {
      handleApiError(
        error, 
        next, 
        'Error en la llamada al API Fiware createOrder'
      );
    }
  }
  
}
