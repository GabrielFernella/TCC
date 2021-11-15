# Commands Start 
yarn typeorm migration:generate -- -n alterpagamentoProperties

# Steps Create
1. create database web_educa
2. yarn typeorm migration:run
3. yarn dev:server


docker build -t nome_do_container .
docker run -p 3000:3000 -d tcc_backend_1


export enum StatusAula {
  Agendada = 0,
  Confirmada = 1, -> Depois que o Professor realiza a confirmação
  EmProgresso = 2, -> se o aluno não realizou o pagamento, ele não vai conseguir acessar o link da aula
  Efetivada = 3, -> O aluno deverá confirmar a aula 
  Canceladas = 4, -> Caso o Professor ou aluno  
  Concluida = 5, -> Depois que a aula for concluida e o pagamento já realizado
}

statusPagamento {
  EmEspera = 0, -> Assim que o agendamento é criado
  Processando = 1, -> aguardando pagamento do aluno
  Efetivado=2, -> Efetivado é quando o aluno conclui o pagamento (cartão ou pix)
  Negado = 3,
  Cancelado = 4,
  Concluido = 5,
}







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
