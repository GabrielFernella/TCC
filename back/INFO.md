# Commands Start 


# Steps Create
1. create database web_educa
2. yarn typeorm migration:run
3. yarn dev:server


docker build -t nome_do_container .
docker run -p 3000:3000 -d tcc_backend_1



statusPagamento
  EmEspera = 0,
  Processando = 1,
  Negado = 2,
  Cancelado = 3,
  Concluido = 4,

# Fazer
1. Validar o limite de agendamentos para dois enquanto não estiver pago - OK
2. atributo pix do destinatário no pagamento - OK
3. colocar atributo professor_id em pagamento (rever necessidade)
4. Continuar Tela de listagem de pagamentos, e mostrado um link para direcionar para API do Arthur
5. verificar a parte de cancelamento tanto do aluno quanto do professor, toda parte de cancelamento e liberação do horário
6. verificar as notificações e add um atributo de read, e colocar um icone de close para remover a notificação


version: '3.8'

services:
  backend:
    build:
      context: ./back
      dockerfile: ./Dockerfile
    ports:
      - 3333:3333
    restart: unless-stopped
    networks:
      - net-back
    depends_on:
      - postgres
      - mongo
    volumes:
      - ./back/:/app/
      - /app/node_modules/
    #command: yarn dev:server

  frontend:
    build:
      context: ./front
      dockerfile: ./Dockerfile
    ports:
      - 3000:3000
    restart: unless-stopped
    volumes:
      - ./front/:/app/
      - /app/node_modules/
    #command: yarn start
    stdin_open: true

  postgres:
    image: postgres:alpine
    ports:
      - 5432:5432
    restart: unless-stopped
    networks:
      - net-back
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=web_educa

  mongo:
    image: mongo
    ports:
      - 27017:27017
    restart: unless-stopped
    networks:
      - net-back
    volumes:
      - mongo-data:/data/db

volumes:
  postgres-data:
    driver: local
  mongo-data:
    driver: local

networks:
  net-back:
    driver: bridge
