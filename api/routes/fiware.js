import { Router } from 'express'
import { FiwareController } from '../controllers/fiware.js'
import { isAuthenticated } from '../middlewares/auth.js';

export const fiwareRouter = Router()

// Aplica el middleware isAuthenticated a todas las rutas de este router
fiwareRouter.use(isAuthenticated);

fiwareRouter.get('/assettypes', FiwareController.getAssetTypes);
fiwareRouter.post('/createasset', FiwareController.createAsset);
fiwareRouter.post('/createproduct', FiwareController.createProduct);
fiwareRouter.post('/createoffering', FiwareController.createOffering);
fiwareRouter.get('/offerlist', FiwareController.getOfferList);
fiwareRouter.post('/createorder', FiwareController.createOrder);