const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [{
    nome: 'Geiziane Silva',
    imagem: 'https://avatars.githubusercontent.com/u/158302313?v=4',
    minibio: 'Desenvolveedora Jr'
},
{

    nome: 'Simara Conceição',
 
    imagem: 'https://bit.ly/3LJIyOF',
 
    minibio: 'Desenvolvedora e instrutora',
 
  },
 
  {
 
    nome: 'Iana Chan',
 
    imagem: 'https://bit.ly/3JCXBqP',
 
    minibio: 'CEO & Founder da PrograMaria',
 
  },
 
  {
 
    nome: 'Luana Pimentel',
 
    imagem: 'https://bit.ly/3FKpFaz',
 
    minibio: 'Senior Staff Software Engineer',
 
  }];



function mostraMulheres(request, response) {
    response.json(mulheres);
}


function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get('/mulheres', mostraMulheres));
app.listen(porta, mostraPorta);