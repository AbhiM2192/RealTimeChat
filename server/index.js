const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const {addUser,removeUser,getUser,getUserinRoom} = require('./Users')

const PORT = process.env.PORT || 5000;
const router = require('./Router');
const { emit } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors())
io.on('connection',(socket) =>{
    console.log('We have a new connection');

    socket.on('Join',({name,room},cb) =>{
        const {error,user} = addUser({id:socket.id,name,room});

        if(error) return cb(error);
        socket.emit('message',{user:'admin',text:`${user.name}, Welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});
        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room,users:getUserinRoom(user.room)})
    });
    socket.on('sendMessage',(message,callback) =>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message});
        io.to(user.room).emit('roomData',{room:user.room,users:getUserinRoom(user.room)})

        callback()
    })
    socket.on('disconnect',() =>{
    console.log('User has Left');
    const user = removeUser(socket.id);
    if(user){
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
    }
})
})


server.listen(PORT,(error) =>{
    if(error){
        console.log('Unexpected Error occured');
    }else{
        console.log(`Server Listening on port${PORT}`);
    }
})