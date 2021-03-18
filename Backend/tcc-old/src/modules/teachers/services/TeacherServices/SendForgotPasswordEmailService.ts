import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ITeacherRepository from '../../repositories/ITeacherRepository';
import ITeacherTokensRepository from '../../repositories/ITeacherTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('TeacherTokensRepository')
    private teacherTokensRepository: ITeacherTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.teacherRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.teacherTokensRepository.generate(user.id);

    // Buscando o arquivo de template do email de recuperação
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

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
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
