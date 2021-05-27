import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/professor/services/ProfessorServices/AuthenticateUserService';
import TokenUserService from '@modules/professor/services/ProfessorServices/TokenUserService';

export default class SessionsController {
  public async getToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { authorization } = request.headers;

    const authenticateUser = container.resolve(TokenUserService);

    if (!authorization) {
      return response.json({ error: 'Token inválido' });
    }

    const token = await authenticateUser.execute(authorization);

    return response.json(token);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
