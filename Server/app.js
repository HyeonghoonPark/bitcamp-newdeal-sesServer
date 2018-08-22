'use strict'

const express = require('express')
const app = express();

app.use('/sesServer', require('./sesServer'))

app.get('/hello', (req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    res.write('Hello!');
    res.end();
})

app.listen(8000, () => {
    console.log('Server Start')
})