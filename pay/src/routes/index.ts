import { Router } from 'express';

import { payRoute } from './pay.routes';

const routes = Router();

routes.use('/', payRoute);

export default routes;
