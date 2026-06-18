const {createClient} = require('redis')
require('dotenv').config()

const redis = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});



module.exports = redis


