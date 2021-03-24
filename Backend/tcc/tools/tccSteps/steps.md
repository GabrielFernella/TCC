# Vendo agora

1. Processo de criação de disciplina.service
2. Adicione as Rotas, comece por uma entidade específica
3. Ver parte de busca do id do usuário pelo middleware
4. Professor Controller & Disciplina controller

# Iniciar aplicação

1. docker start postgres mongo redis
2. Rodar (yarn typeorm migration:generate -- -n CreatedEntities) && (yarn typeorm migration:run) para criar banco de dados

# Lista de Tarefas

1. Terminar implementações do Students, Teachers
2. Criar os serviços para as entidades
3. Fazer o CRUD completo para aulas, disponibilidade e avaliacao tendo nota que alguns precisam ser apenas alterados

# Comandos

1. yarn typeorm migration:generate -- -n CreatedEntities (Serve para sair do Model e gera uma migration )
2. yarn typeorm migration:create -n CreateAppoinments (Criando a tabela no banco de dados)
3. yarn typeorm migration:run (Rodar as migrations disponíveis)
4. yarn typeorm migration:revert (só pode alterar uma migration se ela não foi enviada para o sistema)
5. yarn typeorm migration:show (visualizar todas as migrations)
6. drop database web_educa  == create database web_educa -- "192.168.56.101",

# Onde parei?

Cadastrar a disponibildiade (Entender como vai funcionar o sistema de agendamento) e cadastrar as aulas

# Como iniciar?

1. Altere o IP do servidor no arquivo ormconfig.json de acordo com o ip do seu servidor de banco de dados
2. Instale as dependências com o comando yarn
3. Crie a database "web_educa" no banco de dados
4. Rode o comando: yarn typeorm migration:run    (Para criar as tabelas no banco de dados)

## Criando um model a partir do banco

Instalação -> npm i -g typeorm-model-generator
Glossário -> -h Local do servidor | -d database | -u name authentication | -x password | -e type DB | -o path generated file | -s public | -p port Connection
Utilização -> typeorm-model-generator -h localhost -d web_educa -u postgres -x postgres -e postgres -o ./typegen -s public -p 5432
