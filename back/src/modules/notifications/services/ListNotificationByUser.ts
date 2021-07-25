import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../infra/typeorm/schemas/Notification';

interface IRequest {
  user_id: string;
}

@injectable()
class ListNotificationByUser {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Notification[]> {
    // list notificação
    const notify = await this.notificationRepository.list(user_id);

    if (!notify) {
      throw new AppError('Nenhuma notificação encontrada');
    }

    return notify;
  }
}

export default ListNotificationByUser;
