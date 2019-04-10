const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//Define que qualquer dominio pode acessar a api
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//Separa os usuários em salas
io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

mongoose.connect(
    'mongodb+srv://oministack:oministack@cluster0-rcnlf.mongodb.net/oministack?retryWrites=true', 
    {
        useNewUrlParser: true,
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

//Cadastrar um módulo dentro do express
app.use(express.json());

//Permite o envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

//Importa o arquivo de rotas
app.use(require('./routes'));

server.listen(process.env.PORT || 3333);