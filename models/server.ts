import express from "express";
import cors from "cors";
import { Server as ioServer } from "socket.io";
import { createServer } from "http";
import { socketController } from "../sockets/index.js";

export class Server {
    constructor(
        private app = express(),
        private server = createServer(app),
        private io = new ioServer(server),
        private port: Number | any = process.env.PORT,
    ) {

        this.middlewares()
        this.sockets()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        // this.app.use(auth.path, auth.router)
    }

    sockets() {
        this.io.on("connection", _socket => {
            socketController(_socket)
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`The server is running in http://localhost:${this.port}`)
        })
    }
}