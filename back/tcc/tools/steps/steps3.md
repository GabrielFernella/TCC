# Anotações

## Pacotes Iniciais

1. yarn add tsconfig-paths -D
2. yarn add tsyringe (Utilizada para injeção de dependência )

=============================================================================================================

## Processos

1. Edite o arquivo de tsconfig.json para criar as variáveis de path
2. Estruturando a aplicação utilizando metodologia DDD e TDD
3. A aplicação fica dividida em três seguimentos

4.

=============================================================================================================

## Notes

### Seguimentos da estrutura

@config - Armazena todos os aquivos de configuração
@modules - Contém toda regra de negócio da aplicação, dividimos o mesmo por domínio, onde cada domínio é responsável por determinado assunto no sistema, ou seja, um não depende do outro para funcionar.
@shared - Nesse diretório deixaremos toda parte de ferramentas que utilizamos no projeto, como nosso ORM, arquivo de rotas principal, arquivo do server e etc

### Estrutura de Pastas

config/
files - Arquivos de configuração

modules/

shared/
