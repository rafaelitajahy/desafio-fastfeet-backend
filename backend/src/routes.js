import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import ControlDeliveryController from './app/controllers/ControlDeliveryController';
import DeliveriesDeliverymanController from './app/controllers/DeliveriesDeliverymanController';

import authMiddlewar from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get(
  '/deliveryman/:id/deliveries',
  DeliveriesDeliverymanController.deliveries
);
routes.get(
  '/deliveryman/:id/delivered',
  DeliveriesDeliverymanController.delivered
);

routes.use(authMiddlewar);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.show);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.put('/delivery/:id/finish', ControlDeliveryController.finishDelivery);
routes.put(
  '/delivery/:id/withdrawdelivery',
  ControlDeliveryController.withdrawDelivery
);

export default routes;
