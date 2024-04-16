var express=require("express");
var socket=require("socket.io");



var app=express();

app.get("/1",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

var server=app.listen(3001,function(){
    console.log("Server running on http://localhost:3001")
})

app.use(express.static("public"));

//Socket Connection

var io=socket(server);

io.on('connection',function(socket){
    console.log("Connection Established",socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

})