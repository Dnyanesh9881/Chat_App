const { Console } = require('console');
const express = require('express');

const {createServer}= require('http');
const {Server}=require('socket.io');

const app=express();
const httpServer=createServer(app);

const io=new Server(httpServer, {
    cors:{
        origin:'http://127.0.0.1:5500',
    },
}) ;


io.on("connection", (socket)=>{
   console.log(`User connected: ${socket.id}`);

socket.on('username enter',(data)=>{
console.log('username enter', data);

io.emit('username enter', (data));
})
socket.on('message',(data)=>{
    console.log('meassage is being sent to all the clients');
    io.emit('message', data)
});

socket.on('username left', (username)=>{
io.emit('username left', username);
})
})

// console.log("ok");

httpServer.listen(3000,()=>{
    console.log(`server listening on PORT 3000`);
    
})