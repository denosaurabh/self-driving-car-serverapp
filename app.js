const app = require('express')();
const cors = require('cors');

app.use(cors());
app.use('*', cors())

const port = 5000;

const server = app.listen(port, () => {
    console.log(`Main Server is listening for reqests in port ${port}....`)
})

const io = require('socket.io').listen(server);

// Emiting and Waiting for Evenst for Car

io.on('connection', socket => {
    console.log('Something get Connected');
    
    socket.on('straightmove', data => {
        console.log('Sending data to car to move forward')
        io.emit('forward', 'forward')
    })
    
    socket.on('backmove', data => {
        console.log('Sending data to car to move backward')
        io.emit('backward', 'backward')
    })
    
    socket.on('leftmove', data => {
        console.log('Sending data to car to move left')
        io.emit('left', 'left')
    })
    
    socket.on('rightmove', data => {
        console.log('Sending data to car to move right')
        io.emit('right', 'right')
    })
})

