const express = require('express')
const rote = require('../src/routes/route')
const app = express()
const porta = 8080;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', rote)
app.use(express.static('../public'))
app.set('view engine', 'ejs')

app.listen(porta, ()=>{
    console.log("Servidor iniciado em http://localhost:" + porta + "/")
})