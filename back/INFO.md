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

# Fazer
1. colocar atributo professor_id em pagamento (rever necessidade)
2. Continuar Tela de listagem de pagamentos, e mostrado um link para direcionar para API do Arthur
4. verificar as notificações e add um atributo de read, e colocar um icone de close para remover a notificação
5. ver a parte de recuperação de senha

# Pagamento
1. API para alterar o status do pagamento para pago (colocar uma chave de segurança)
2. Robo para processar todos os pagamentos feitos no dia, e efetivar o pagamento

# Pagamento
1. Mostrar mais informações no response para exibir para o aluno (n lembro)

# Nota de aula
1. O aluno, após terminar a aula, precisa confirmar a aula como concluída e deverá dar uma nota

# Concluir Aula
1. Validar se a data já passou para ele avaliar a aula
2. validar se para fazer um novo agendamento, o aluno concluiu as aulas para efetivar o pagamento do professor

# Robo
1. Fazer o processamento de pagamento, montar um exemplo de objeto que será retornado

# Cancelamento de aula
1. validar horário
2. montar parte de reembolso
3. testar e add no web
4. liberação do horário que foi cancelado - ok

# mandar um email para o professor assim que for feito um agendamento
1. Mandar um e-mail para o professor entrar no portal para aceitar o agendamento

# Verificar a parte de listagem de disponibilidade das disciplinas
1. filtar e mostrar a cor escura para os agendamentos que foram cancelados (ver na web)

# PayPagamentoService
1. Essa classe deve pegar as propriedades para atualizar o pagamento do aluno(fazer apenas uma simulação)





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
