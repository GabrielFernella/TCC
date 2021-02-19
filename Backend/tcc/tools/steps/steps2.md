## Pacotes Iniciais

1. docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
2. yarn add typeorm pg
3. yarn add reflect-metadata (para entender a sintaxe de decorators e outros)
4. yarn typeorm migration:create -n CreateAppoinments (Criando a tabela no banco de dados)
5. yarn typeorm migration:run (Rodar as migrations disponíveis)
6. yarn typeorm migration:revert (só pode alterar uma migration se ela não foi enviada para o sistema)
7. yarn typeorm migration:show (visualizar todas as migrations)
8. yarn add cors && yarn add @types/cors -D (Para autorizar a conexão entre a API e Frontend)

## Processos

1. Crie seu container docker com o Postgres
2. Faça a configuração da conexão com o banco e o ORM
3. Acrescente o seguinte script dentro do package.json ("typeorm": "ts-node-dev ./node_modules/typeorm/cli.js")
4. Crie as tabelas do banco de dados (Migration)
5. faça a conexão entre seu Model e seu BD

## Anotações

=============================================================================================================

## Pacotes Iniciais

1. yarn typeorm migration:create -n CreateUsers
2. yarn typeorm migration:run
3. yarn add bcryptjs && yarn add -D @types/bcryptjs
4. yarn add jsonwebtoken && yarn add -D @types/jsonwebtoken (MD5 online para criar um hash de texto)
5. yarn add multer && yarn add -D @types/multer (middleware de upload de aquivos para express)
6. yarn add express-async-errors (Esse pacote é responsável por possibilitar a captura de erros async)

## Processos

1. Crie seu container docker com o Postgres

## Anotações
