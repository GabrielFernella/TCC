## Pacotes Iniciais

// 11:00

1. docker run --name mongo -p 27017:27017 -d -t mongo
2. mongodb://192.168.56.101:27017
3. yarn add mongodb
4. yarn add @types/mongodb -D
5. yarn add celebrate (biblioteca de validação)
6. yarn add -D @types/hapi\_\_joi (esse pacote é um complemento celebrate, para validação(são dois underlines))
7. yarn add dotenv
8. yarn add class-transformer (Conseguimos manipular as informações que nossa API irá expor)
9. yarn add aws-sdk (para utilizar os serviços da amazon SES)
10. yarn add mime (para trabalhar com extensões diferentes de arquivos)

=============================================================================================================

## Processos

1. Crie o container do seu banco de dados no docker
2. Crie a conexão com o banco de dados mongodb no arquivo de ormconfig
3. instale as dependências do celebrate e configure a tratativas de erros no arquivo server.ts

=============================================================================================================

## Notes

## Estrutura básica para funcionalidades

Para criar funcionalidades seguindo o desenvolvimento em TDD siga a seguinte estrutura

1. Crie a interface do repositório
2. Crie seu fake repository
3. Crie os métodos que seu repositório necessita (do typeorm)
4. Crie um service por meio das regras de negócio da sua aplicação
5. Crie os testes do serviço que está implementando
6. Crie o controller que chamará os serviços
7. Crie as Rotas e adicione na rota principal
