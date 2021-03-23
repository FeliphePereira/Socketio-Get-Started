const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {//cria a rota
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {//"Escutando" se alguem se conectou a página e informando no console
    console.log('a user connected' + " " + socket.id); //printa toda vez que um novo usuario se conecta
    socket.on('chat message', msg => {//Gerenciador de eveto Escutando a mensagem digitada pelo cliente, recebo o chat message e faço um emit do servidor para todos os clientes 
        io.emit('chat message', msg);//enviando ao demais clientes a mensagem recebida pelo servidor
    });
});

http.listen(3000, () => {
  console.log(`listening on *:3000`);
});