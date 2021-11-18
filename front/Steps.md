# Front

# Tela de listagem de agendamentos @
2. Ordenar os agendamentos por data

# listagem de pendencias @
1. Melhorar a listagem 

# Na tela de agendamento info
1. Pode ter um botão para processar o pagamento e será validado se já foi pago ou não

# Aceitação de Aula
1. Verificar como funciona o status do professor aceitar o agendamento (usar a api de update status no front)

# Mostrar avaliação de outros agendamentos
1 - rota do formulário para Home
2 - cancelamento limitado por hora tando do professor quanto do aluno

# Tela de financeiro Aluno
3 - mostrar data da aula ou alguma referencia

# Verificar a parte de listagem de disponibilidade das disciplinas
1. filtar e mostrar a cor escura para os agendamentos que foram cancelados (ver na web)

# Reset de senha
1. Validar se está funcionando

###########################################################################################################
# Back

# Fazer
2. Continuar Tela de listagem de pagamentos, e mostrado um link para direcionar para API do Arthur
4. verificar as notificações e add um atributo de read, e colocar um icone de close para remover a notificação
5. ver a parte de recuperação de senha

# Pagamento
1. API para alterar o status do pagamento para pago (colocar uma chave de segurança)
2. Robo para processar todos os pagamentos feitos no dia, e efetivar o pagamento

# Concluir Aula
1. Validar se a data já passou para ele avaliar a aula
2. validar se para fazer um novo agendamento, o aluno concluiu as aulas para efetivar o pagamento do professor - acho que OK

# Robo
1. Fazer o processamento de pagamento, montar um exemplo de objeto que será retornado
2.  Essa classe deve pegar as propriedades para atualizar o pagamento do aluno(fazer apenas uma simulação)

# Cancelamento de aula
1. validar horário

# PayPagamentoService
1. Essa classe deve pegar as propriedades para atualizar o pagamento do aluno(fazer apenas uma simulação)





Tela de listagem de agendamento Professor
1 - Ordenar por data

Robo de pagamento
1 - Verifica se o aluno pagou (tranfere para o professor)
2 - Se professor/aluno cancelou e Aluno pagou = extorno para o pix do aluno
3 - parte de reembolso
4 - Print
5 - Diagrama até o final o mês

Parte de Avaliação de Aula (Dá para colocar na parte de agendamento depois que o aluno concluir a aula)

mostrar lista de informação em relação ao agendamento