import { Router } from 'express'
import { EdcController } from '../controllers/edc.js'

export const edcRouter = Router()

edcRouter.post('/createasset', EdcController.createAsset);
edcRouter.post('/createpolicy', EdcController.createPolicy);
edcRouter.post('/createcontract', EdcController.createContract);
edcRouter.post('/fetchcatalog', EdcController.fetchCatalog);
edcRouter.post('/startnegotiation', EdcController.startNegotiation);
edcRouter.get('/getagreementid', EdcController.getAgreementId);
edcRouter.post('/starttransfer', EdcController.startTransfer);
edcRouter.get('/pulldata', EdcController.pullData);