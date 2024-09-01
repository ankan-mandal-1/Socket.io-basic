const app = require("express")();

const server = require("http").createServer(app)

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("Socket connected!")

    socket.on("chat", (payload) => {
        console.log("PAYLOAD: ", payload);

        io.emit("chat", payload)
    })
})

server.listen(5000, () => console.log("Server is active..."))

// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors")

// const {Server} = require("socket.io")

// app.use(cors())

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket) => {
//     console.log("User connected " + socket.id)

//     socket.on("send_message", (data) => {
//         socket.broadcast.emit("receive_message", data)
//     })
// })

// server.listen(3000, () => {
//     console.log("Server is running PORT 3000")
// })