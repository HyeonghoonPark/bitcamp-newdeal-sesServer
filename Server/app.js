'use strict'

const express = require('express')
const app = express();

app.use('/sesServer', require('./sesServer'))

app.get('/hello', (req, res) => {
    //res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'},302, {"Location": "http://www.naver.com"})

    //res.write(`안녕하세요 ${req.query.email}`);
    console.log("hello!!!!")
    res.writeHead(302, {"Location": "http://www.naver.com"});
    
    res.end();
})

app.listen(8000, () => {
    console.log('Server Start')
})