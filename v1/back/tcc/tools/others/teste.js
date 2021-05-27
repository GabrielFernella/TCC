const id = `${Date.now()}`;
const emailDoPagador = 'victordevtb@outlook.com';

const dados = {
  items: [
    (item = {
      id,
      title: '2x video games;3x camisas',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: parseFloat(150),
    }),
  ],
  payer: {
    email: emailDoPagador,
  },
  external_reference: id,
};

try {
  const pagamento = await MercadoPago.preferences.create(dados);
  // Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
  return res.redirect(pagamento.body.init_point);
} catch (err) {
  return res.send(err.message);
}
