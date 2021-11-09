const express = require("express");
const cors = require('cors');
const {Request, Response} = require("express");
const MercadoPago = require("mercadopago"); 
var bodyParser = require('body-parser');
const { setTimeout } = require("timers");
const app = express();

//nodemon server.js
//https://github.com/mercadopago/sdk-nodejs/blob/master/examples/payment-search/search-payments.js
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-454186915443095-092004-b8d3c1ca1d1c7b9e37b71060544d1087-345470388"
});



app.get("/search", async (req, res) => {

    /*const filters = {
        //site_id: 'MLA',
        //external_reference: '345470388-595ff56c-8901-4d0e-957a-cb4f733614e6'
        //id: '345470388-595ff56c-8901-4d0e-957a-cb4f733614e6'
        external_reference: '2079cc87-5411-4531-b1e9-83eaba1ca8e2'
      };*/

      var filters = {
        //external_reference: '2079cc87-5411-4531-b1e9-83eaba1ca8e2',
        site_id: '345470388-4f2ccb68-d651-437f-a7ff-65ad6b4bc60d'
      };
    
      const result = await MercadoPago.payment.search({
        qs: filters
      }).then(function (data) {
        console.log(data)
        /*res.render('payment-search/search-result', {
          result: data
        });*/
        return data;
      }).catch(function (error) {
        /*res.render('500', {
          error: error
        });*/
        console.log(error)
      })

    console.log(result)

    return res.json({ result: result})



      /*MercadoPago.preferences.findById({
        //qs: filters
      }).then(function (data) {
        res.send(data);
      }).catch(function (error) {
        res.send(error);
      });*/

    
});

//Buscar Pagamento
app.get("/", async (req, res) => {

    MercadoPago.payment.search({
      //qs: filters
      
    }).then(function (data) {
        
      res.send(data);
    }).catch(function (error) {
      res.send(error);
    });

  
});

app.post("/pagar",async (req, res) => {

    const {id, title, valor, emailDoPagador } = req.body;

    // Pagamentos

    // id // codigo // pagador // status
    // 1 // 1593163315787 // arthru@gmail.com  // Não foi pago
    // 2 //  1593163315782 // teste@gmail.com // Pago

    //var id = "" + Date.now();
    //var emailDoPagador = "victordevtb@outlook.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: title,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(valor)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        console.log(pagamento.body.init_point)
        console.log(pagamento)
        //return res.redirect(pagamento.body.init_point);
        return res.json({url: pagamento.body.init_point})
    }catch(err){
        return res.send(err.message);
    }
});

app.post("/not",(req, res) => {
    var id = req.query.id;

    setTimeout(() => {

        var filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            var pagamento = data.body.results[0];

            if(pagamento != undefined){
                console.log(pagamento.external_reference);
                console.log(pagamento.status); // approved
            }else{
                console.log("Pagamento não existe!");
            }
        }).catch(err => {
            console.log(err);
        });

    },20000)

    res.send("OK");
});


app.listen(80,(req, res) => {

    console.log("Servidor rodando!");

});