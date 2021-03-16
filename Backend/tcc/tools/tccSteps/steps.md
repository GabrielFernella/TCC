# Lista de Tarefas

1. Terminar implementações do Students, Teachers
2. Criar os serviços para as entidades
3. Fazer o CRUD completo para aulas, disponibilidade e avaliacao tendo nota que alguns precisam ser apenas alterados

# Comandos

1. yarn typeorm migration:create -n CreateAppoinments (Criando a tabela no banco de dados)
2. yarn typeorm migration:run (Rodar as migrations disponíveis)
3. yarn typeorm migration:revert (só pode alterar uma migration se ela não foi enviada para o sistema)
4. yarn typeorm migration:show (visualizar todas as migrations)
5. drop database web_educa  == create database web_educa -- "192.168.56.101",

# Onde parei?

Cadastrar a disponibildiade (Entender como vai funcionar o sistema de agendamento) e cadastrar as aulas

# Como iniciar?

1. Altere o IP do servidor no arquivo ormconfig.json de acordo com o ip do seu servidor de banco de dados
2. Instale as dependências com o comando yarn
3. Crie a database "web_educa" no banco de dados
4. Rode o comando: yarn typeorm migration:run    (Para criar as tabelas no banco de dados)
