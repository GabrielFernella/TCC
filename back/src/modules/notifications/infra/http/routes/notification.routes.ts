import { Router } from 'express';

import EchoController from '../controllers/EchoController';
import NotificationController from '../controllers/NotificationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const notificationRoute = Router();
const echoController = new EchoController();
const notificationController = new NotificationController();

notificationRoute.get('/echo', echoController.show);

notificationRoute.use(ensureAuthenticated);
notificationRoute.get('/', notificationController.show);

export default notificationRoute;
