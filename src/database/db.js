//carrega o módulo mongoose
const mongoose = require('mongoose')
//String para usar o MongoDB na porta 27017 (porta padrão do MongoDB) e nome do banco de dados web-app
mongoose.connect('mongodb://localhost:27017/devil-app')
module.exports = {Mongoose: mongoose}