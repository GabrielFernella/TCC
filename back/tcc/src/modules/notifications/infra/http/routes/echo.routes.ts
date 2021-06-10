import { Router } from 'express';

import EchoController from '../controllers/EchoController';

const echoRoute = Router();
const echoController = new EchoController();

echoRoute.get('/', echoController.show);

export default echoRoute;
