import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IAlunoRepository from '../repositories/IAlunoRepository';
import IAlunoTokensRepository from '../repositories/IAlunoTokensRepository';

import { generateKey } from '../../../shared/container/Tools';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AlunoTokensRepository')
    private alunoTokensRepository: IAlunoTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.alunoRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await this.alunoTokensRepository.findByToken(user.id);

    let newToken;
    if (!token) {
      newToken = await this.alunoTokensRepository.generate(user.id);
    }

    // Buscando o arquivo de template do email de recuperação
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const key = generateKey();
    // console.log(key);

    user.key = key;

    await this.alunoRepository.save(user);
    // Enviar o email para o destinatário
    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[WebEduca] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${
            token ? token.token : newToken
          }`,
          key,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
