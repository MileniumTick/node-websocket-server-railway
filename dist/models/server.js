import express from "express";
import cors from "cors";
import { Server as ioServer } from "socket.io";
import { createServer } from "http";
import { socketController } from "../sockets/index.js";
export class Server {
    app;
    server;
    io;
    port;
    constructor(app = express(), server = createServer(app), io = new ioServer(server), port = process.env.PORT) {
        this.app = app;
        this.server = server;
        this.io = io;
        this.port = port;
        this.middlewares();
        this.sockets();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes() {
    }
    sockets() {
        this.io.on("connection", _socket => {
            socketController(_socket);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`The server is running in http://localhost:${this.port}`);
        });
    }
}
//# sourceMappingURL=server.js.map