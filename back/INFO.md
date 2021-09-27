# Commands Start 


# Steps Create
1. create database web_educa
2. yarn typeorm migration:run
3. yarn dev:server



statusPagamento
  EmEspera = 0,
  Processando = 1,
  Negado = 2,
  Cancelado = 3,
  Concluido = 4,

# Fazer
1. Validar o limite de agendamentos para dois enquanto não estiver pago
2. atributo pix do destinatário no pagamento - OK
3. colocar atributo professor_id em pagamento (rever necessidade)
4. Continuar Tela de listagem de pagamentos, e mostrado um link para direcionar para API do Arthur