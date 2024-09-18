const express = require("express"); //inicio express
const router = express.Router(); //configurando primeira parte da rota
const cors = require('cors'); // pacote cors
const conectaBancoDeDados = require('./data');//ligando ao arquivo do banco de dados
conectaBancoDeDados(); // chamando a função

const Mulher = require('./mulherModel');
Mulher();

const app = express(); //iniciando app
app.use(express.json());
app.use(cors());
const porta = 3333; //criando a rota


//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find(); //find abstração do mongoose

    response.json(mulheresVindasDoBancoDeDados);
  } catch(erro) {
    console.log(erro);
  }
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  });

  try { 
    const mulherCriada = await novaMulher.save(); 
    response.status(201).json(mulherCriada); // status 201 - resposta criada
  } catch(erro) {
    console.log(erro);
  }
}

//PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if(request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    } else if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    } else if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    } else if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch(erro) {
    console.log(erro);
  }
}

//DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);

    response.json({messagem: 'mulher deletada com sucesso'});
  } catch(erro) {
    console.log(erro);
  }
}

//Porta
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta);
}


//Rotas
app.use(router.get("/mulheres", mostraMulheres)); //configuração rota GET/mulheres
app.use(router.post("/mulheres", criaMulher)); //configuração rota POST/mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)); //configuração rota PATCH/mulheres
app.use(router.delete("/mulheres/:id", deletaMulher)); //configuração rota DELETE/mulheres
app.listen(porta, mostraPorta);
