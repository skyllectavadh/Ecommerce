const mapData = (data, message = '') => {
    return {
        success: true,
        code: 200,
        message,
        data,
        error: null
    }
}

exports.init = () => {
    global.io.on('connection', (socket) => {
        console.log('user connected - ' + socket.id)                            
    })
}

exports.addProduct = (event, data) => {
    global.io.emit(event, mapData(data))
}

exports.getProduct = (event, data) => {
    global.io.emit(event, mapData(data))
}









