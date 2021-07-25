import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import EchoService from '@modules/notifications/services/EchoService';

export default class EchoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const echo = container.resolve(EchoService);

    const echoResponse = await echo.execute();

    return response.json(classToClass(echoResponse));
  }
}
