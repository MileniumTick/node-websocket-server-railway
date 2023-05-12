import { Socket } from "socket.io"

export const socketController = (socket: Socket) => {

    console.log('Cliente conectado', socket.id)

    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id)
    })

    socket.on('send-message', (payload, callback) => {

        const id = 1236756123
        callback(id)

        socket.broadcast.emit('send-message', payload)
    })
}