import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStudentRepository from '../repositories/IStudentRepository';
import IStudentsTokensRepository from '../repositories/IStudentsTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('SudentsTokensRepository')
    private studentsTokensRepository: IStudentsTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.studentRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.studentsTokensRepository.generate(user.id);

    // Buscando o arquivo template de email de recuperação
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
