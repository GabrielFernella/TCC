import { Router } from 'express';

//import controller
import { Pay } from '../controllers/Pay';

const payRoute = Router();
const payController = new Pay();

payRoute.post('/', payController.execPayment);

export { payRoute };
