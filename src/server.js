const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();


app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://janderson:8246917312129@clusterapi-5ip1i.mongodb.net/omnistack?retryWrites=true',
    { useNewUrlParser: true });


app.use((req, res, next) => {
    req.io = io;

    return next();
});


//Modulo que ajuda nosso servidor a entender os formatos JSON
app.use(express.json());

//Modulo que permite uploads de arquivo
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//Permite usar o arquivo de rotas, importando a rota
app.use(require('./routes'));

// app.get('/', (req, res) => {
//     return res.send('Olá Mundão!');
// });


server.listen(3333);