const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('server is run on port' + port)
})