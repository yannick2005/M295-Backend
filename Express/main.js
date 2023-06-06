const express = require('express')
const app = express()
const port = 3000

app.get("/", (request, response) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`)
})