Listando horários disponíveis

# Anotações

- Envio de emails 18min

## Pacotes Iniciais

1. yarn add nodemailer
2. yarn jest --clearCache

=============================================================================================================

## Processos

1. Estrutura básica para funcionalidades

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
