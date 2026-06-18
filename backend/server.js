require('dotenv').config()

const app = require('./src/app')
const ConnectDB = require('./src/config/database')
const redis = require('./src/config/redis')

const PORT = process.env.PORT || 5000

async function connectConfigs(){
  await ConnectDB()
  await redis.connect()
  console.log('Redis connected')
}

connectConfigs()

app.listen(PORT,"0.0.0.0",()=>{
    console.log('Server running on port ',PORT);
})
