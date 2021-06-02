import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/professor/services/ProfessorServices/ResetPasswordService';

import AuthenticateUserService from '@modules/professor/services/ProfessorServices/AuthenticateUserService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    // const { authorization } = request.headers;

    const resetPassword = container.resolve(ResetPasswordService);
    // const token = authorization;
    await resetPassword.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
