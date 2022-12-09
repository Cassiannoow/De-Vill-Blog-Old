//carrega o módulo mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
//String para usar o MongoDB na porta 27017 (porta padrão do MongoDB) e nome do banco de dados web-app
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1/devil-app')
module.exports = {Mongoose: mongoose}