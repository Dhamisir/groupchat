const express= require("express");
const app=express();
const path=require("path");

var server = require('http').Server(app); // for socket
// for live server
const port = process.env.PORT || 3000;
// server create using server insted of app because of socket
server.listen(port,()=>{
    console.log("listening on "+port)
})
      
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

// for css
app.use(express.static('public'))

// install npm install socket.io 
// after installing setup in index.js and clientjs

    // socket
    const io =require('socket.io')(server);
    io.on("connection",(socket)=>{
        console.log("connn");

        // 3. from client.js
        socket.on('sts',(msg)=>{ // listen on server
            // console.log(msg);
            socket.broadcast.emit('sts',msg) 
            // broadcast means jo msg aa rha hai usse sabko bhejna hai sivaya jisne bheja hai
            // 4. recieve coding in client.js
        })

    });
