import { Router } from 'express'
import { EventController } from '../controllers/event.js'

export const eventRouter = Router()

eventRouter.get('/checkstatus', EventController.checkStatus);
eventRouter.post('/updatestatus', EventController.updateStatus);
eventRouter.post('/resetstatus', EventController.resetStatus);
