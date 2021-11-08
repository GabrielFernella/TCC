/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
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

import '@shared/infra/typeorm';
import '@shared/container';
import { ChatService } from '@modules/chat/services/ChatService';
import { MensagemService } from '@modules/chat/services/MensasgemService';
import routes from './routes';

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

// SOCKET.IO - CHAT

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
    if (params.professorId && params.alunoId && params.agendamentoId) {
      let chat: any;
      chat = await chatService.find(params.agendamentoId);

      if (!chat) {
        chat = await chatService.create(
          params.alunoId,
          params.professorId,
          params.agendamentoId,
        );
      }

      if (params.chatStartText) {
        const mensagem = await mensagemService.create(
          chat.id,
          params.chatStartText,
          params.isAluno,
        );

        io.emit('receber_mensagem', mensagem);
      }

      const mensagens = await mensagemService.findByChatId(chat.id);

      const obj = {
        mensagens,
        chatId: chat.id,
      };

      socket.emit('chat_listar_mensagens', obj);
    }
  });

  socket.on(
    'enviar_mensagem',
    async (params: {
      chatId: string;
      mensagem: string;
      isAluno: boolean | undefined;
    }) => {
      console.log(params);

      const mensagem = await mensagemService.create(
        params.chatId,
        params.mensagem,
        params.isAluno,
      );

      io.emit('receber_mensagem', mensagem);
    },
  );

  socket.on('disconnect', function () {
    console.log('Desconectado');
  });
});

export { server, io };
/*
  socket.on('enviar_mensagem', async params => {
    console.log(params);

    const mensagem = await mensagemService.create(
      params.chatId,
      params.mensagem,
      params.isAluno,
    );

    io.emit('receber_mensagem', mensagem);
  });
  */
