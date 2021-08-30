import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IProfessorTokensRepository from '../../repositories/IProfessorTokensRepository';

import { generateKey } from '../../../../shared/container/Tools';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('ProfessorTokensRepository')
    private professorTokensRepository: IProfessorTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.professorRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.professorTokensRepository.generate(user.id);

    // Buscando o arquivo de template do email de recuperação
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const key = generateKey();

    const teacherSave = await this.professorRepository.saveKey(key);
    // Enviar o email para o destinatário
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[WebEduca] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          key: teacherSave.key,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
