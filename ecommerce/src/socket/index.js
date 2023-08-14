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
    // console.log("check data :- ",data)
    global.io.emit(event, mapData(data))
}

exports.getProduct = (event, data) => {
    // console.log("check data :- ",data)
    global.io.emit(event, mapData(data))
}

exports.editProduct = (event, data) => {
    // console.log("edit data :- ",data)
    global.io.emit(event, mapData(data))
}

exports.deleteProduct = (event, data) => {
    // console.log("del data :- ",data)
    global.io.emit(event, mapData(data))
}








