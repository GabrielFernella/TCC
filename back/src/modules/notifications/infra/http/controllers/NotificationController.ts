import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListNotificationByUser from '@modules/notifications/services/ListNotificationByUser';

export default class NotificationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const not = container.resolve(ListNotificationByUser);

    const notification = await not.execute({
      user_id: id,
    });

    return response.json(classToClass(notification));
  }
}
