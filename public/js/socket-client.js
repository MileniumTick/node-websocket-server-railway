const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado')
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    // console.log('Desconectado')
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().toLocaleDateString()
    }
    socket.emit('send-message', payload, id => {
        console.log('Desde el server', id)
    })
})

socket.on('send-message', payload => {
    console.log(payload)
})