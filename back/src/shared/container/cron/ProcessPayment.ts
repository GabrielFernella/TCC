import cron from 'node-cron';

function SendMessage() {
  console.log('Enviar Mensagem');
}

const exec = cron.schedule('*/1 * * * *', SendMessage, {
  scheduled: true,
});

export default exec;
