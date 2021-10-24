import { Request, Response } from 'express';

import { PayService } from '../service/PayService';

class Pay {
  public async execPayment(request: Request, response: Response): Promise<Response> {
    const { id_pagamento, email, id_agendamento } = request.body;
    const pay = new PayService();
    const result = await pay.execute(id_pagamento);

    return response.json(result);
  }
}

export { Pay };
