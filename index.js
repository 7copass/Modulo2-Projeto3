const express = require("express");
const { networkInterfaces } = require("os");
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const blockchain = [
  {
    id: 1,
    nome:'Ape Cachimbo',
    valor: '98',
    descricao:'',
    imagem: '/img/ape-cachimbo.jpg'

  },
  {
    id: 2,
    nome:'Ape Charuto',
    valor: '91',
    descricao:'',
    imagem: '/img/ape-charuto.jpg'

  },
  {
    id: 3,
    nome:'Ape Gucci',
    valor: '112',
    descricao:'',
    imagem: '/img/ape-gucci.jpg'

  },
  {
    id: 4,
    nome:'Ape Mengo',
    valor: '127',
    descricao:'',
    imagem: '/img/ape-mengo.jpg'

  }, {
    id: 5,
    nome:'Ape Rock',
    valor: '99',
    descricao:'',
    imagem: '/img/ape-rock.jpg'

  },
  {
    id: 6,
    nome:'Ape Fumante',
    valor: '68',
    descricao:'',
    imagem: '/img/ape-cesar.jpg'

  }

]

let nft = undefined;

app.set("view engine", "ejs");
''

app.get("/", (req, res) => {
  res.render('index', {blockchain, nft})
})

app.post('/create',(req, res) =>{
  const newNft = req.body;
  newNft.id = blockchain.length + 1;
  blockchain.push(newNft);
  res.redirect('/')
});

app.get('/delete/:id',(req, res) =>{
  const id = +req.params.id - 1;
  delete blockchain[id];
  res.redirect('/')
});

app.get('/details/:id', (req, res)=>{
  const id = +req.params.id;
  nft = blockchain.filter(Boolean).find((nft) => nft.id === id);
  res.redirect('/');
});

app.post('/update/:id',(req, res)=>{
  const id = +req.params.id -1;
  let update = req.body;
  update.id = id + 1;
  blockchain[id] = update;
  nft = undefined;

  res.redirect('/')
});

app.get('/sobre/:id', (req, res) =>{
  const id = +req.params.id -1;
  res.render('detalhes',{blockchain, id});

});


app.listen(port, () =>
  console.log(`Servidor rodando em: http://localhost:${port}`),
);