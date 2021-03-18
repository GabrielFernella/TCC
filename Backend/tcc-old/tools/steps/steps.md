## Pacotes Iniciais

1. yarn init -y
2. yarn add express
3. yarn add typescript -D (sempre precisa dessa dependência para entender typescript)
4. yarn tsc --init (arquivo de config do typescript)
5. yarn add @types/express -D (Parte dos pacotes instalados é necessário que vc instale essa estenção de tipos para o typescript, sempre instalar como -D)
6. yarn add ts-node-dev -D (Um nodemon para typescript)
7. yarn add uuidv4 (lib para gerar IDs únicos)

## Processos

1. instalar até o quarto pacote
2. Edite o arquivo de config do tsconfig.json e selecione a pasta principal e de distribuição
3. Crie os scripts para iniciar seu projeto
4. Criar rotas

## Anotações

    Gerando a build - Para gerar a build, execute o comando 'yarn tsc'

########################################################################################################################

# @@@@@ Projeto GoBarber Node @@@@@

## Pacotes

1. yarn add date-fns (Essa lib proporciona o tratamento de dados do tipo date)

## Processos

1.

## Anotações

    Usando o date-fns
        parseISO - Converte uma string para o tipo Date
        startOfHour - pega a a hora inicial do time passado (de 17:32 para 17:00)
        isEqual - Compara duas datas

    Repositories
        Esse diretório funciona como um controller na sua aplicação, ele fica responsável por toda parte lógica da sua aplicação(responsável por criar, alterar e deletar os dados da aplicação)
    Models
        Função destinada em agregar as propriedades da nossa entidades (formato dos dados)
    Services
        Armazenar a regra de negócio da aplicação(não tem acesso direto aos dados da requisição ou os dados da resposta)
    Routes
        Para cada tipo de rota, deverá ter um arquivo destinado a todas as regras da quela mesma rota
        Rota: Receber requisição, chamar outro arquivo, devolver requisição

    Separações de Preocupações (SoC)
        DTO - Data transfer Object
