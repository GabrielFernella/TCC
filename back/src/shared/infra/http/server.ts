import 'reflect-metadata';
import 'dotenv/config';
import managerCron from '@shared/container/cron/ProcessPayment';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import { Server, Socket } from 'socket.io';

// import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import { ChatService } from '@modules/chat/services/ChatService';
import { MensagemService } from '@modules/chat/services/MensasgemService';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const server = app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});

//SOCKET.IO - CHAT

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Conectado', socket.id);
});

io.on('connect', async (socket: Socket) => {
  const chatService = new ChatService();
  const mensagemService = new MensagemService();

  socket.on('create_chat', async (params: any) => {
    console.log(params);

    if (params.professorId && params.alunoId && params.agendamentoId) {
      let chat: any;
      chat = await chatService.find(params.agendamentoId);

      if (!chat) {
        newChat = true;

        chat = await chatService.create(
          params.alunoId,
          params.professorId,
          params.agendamentoId,
        );
      }

      if (params.chatStartText) {
        await mensagemService.create(
          chat.id,
          params.chatStartText,
          params.isAluno,
        );
      }

      const mensagens = await mensagemService.findByChatId(chat.id);

      socket.emit('chat_listar_mensagens', mensagens);
    }
  });
});

export { server, io };
