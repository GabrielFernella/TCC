import cron from 'node-cron';
import ProcessRoboPayment from '@modules/aluno/services/ProcessRoboPayment';
import { container } from 'tsyringe';

async function SendMessage() {
  console.log('Enviar Mensagem');

  const process = container.resolve(ProcessRoboPayment);

  const result = await process.execute();

  return result;
}

const exec = cron.schedule('*/1 * * * *', SendMessage, {
  scheduled: true,
});

export default exec;
