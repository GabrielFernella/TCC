import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProfessorRepository from '../../repositories/IProfessorRepository';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IRequest {
  professor_id: string;
  titulo: string;
  tag: string[];
  descricao: string;
  valor: number;
}

@injectable()
class CreateDisciplinaService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    professor_id,
    titulo,
    tag,
    descricao,
    valor,
  }: IRequest): Promise<Disciplina> {
    // ======================================= Procurando se há um user com o mesmo email
    const findTeacher = await this.professorRepository.findById(professor_id);
    if (!findTeacher) {
      throw new AppError('Professor não encontrado.');
    }

    const newValue = valor / 100;

    const tags = tag.map(t => {
      return t.trim();
    });

    // ======================================= validando se há tags repetidas
    let count = 0;
    tags.map(t => {
      if (tags.indexOf(t) === 0) {
        count += 1;
      }
      return '';
    });

    if (count >= 2) {
      throw new AppError('Tags Repetidas.');
    }

    // ======================================= Cadastrando Disciplina
    const cadDisciplina = await this.disciplinaRepository.create({
      professor_id,
      titulo,
      tag: tags,
      descricao,
      valor: newValue || valor,
      qtdAvaliacao: 0,
      mediaAvaliacao: 0,
    });

    // cadastro de notificação
    /* await this.notificationRepository.create({
      recipient_id: cadDisciplina.professor_id,
      content: 'Disciplina cadastrada com sucesso',
      type: 'green',
    }); */

    const user = await this.professorRepository.findById(
      cadDisciplina.professor_id,
    );

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    /* const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    // Envio de email
    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: 'Teste',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `sua chave é: ${user.email}`,
        },
      },
    }); */

    return cadDisciplina;
  }
}

export default CreateDisciplinaService;
