const db = require('../database/db')
const user = require('../models/user');
const { param } = require('../routes/route');
const Users = db.Mongoose.model('esquemaUsers',user.UserSchema,'users')
const logado = 0;
//esperando requisições HTTP GET no path (caminho) /.
//async: antes da função indica que a mesma é assíncrona (realiza a tarefa em segundo plano)
//
exports.renderIncluir = ('/Cadastro', (req, res) => {
    res.render('Cadastro')
 })
exports.Destaques = ('/Destaques.ejs', async(req, res) => {
    res.render('Destaques')
})
exports.home = ('/', async(req, res) => {
    res.render('Home')
})
exports.Login = ('/Login.ejs', async(req, res) =>{
    res.render('Login')
})
exports.Membro = ('/Membro.ejs', async(req, res) => {
    res.render('Membro')
})
exports.Noticias = ('/Noticias.ejs', async(req, res) => {
    res.render('Noticias')
})
exports.Perfil = ('/Perfil.ejs', async(req, res) => {
    res.render('Perfil')
})
/* GET todos os usuários. */
/*exports.buscarjson = ('/usuarios', async (req, res) => {
    await Users.find({}).lean().exec(function (e, listaRegistros) {
        res.json(listaRegistros);
        res.end();
    })
})*/
/*exports.buscarTodos = ('/usuarioshtml', async (req, res) => {
    const listaUsuarios = await Users.find({}).lean().exec()
    res.render('formusers',{listaUsuarios})
})*/
/* GET Incluir novo usuário. */

exports.incluir = ('/incluirUsuario', async(req,res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let member = '0'
    let usuario = new Users({username,email,password,member})
    try{
        await usuario.save()
        res.redirect('/')
    }
        catch(err){
        next(err)
    }
})

exports.loging = ('/LoginAuth', (req, res) =>{
    let email = req.params.email
    let password = req.params.password

    Users.find({email}, (err, user) =>{
        if(err)
            return res.status(500).send({ err: 'Erro ao consultar usuario'})
        if(user.password === password)
            return res.render('Home')
        return res.status(401).send({ mensagem: 'Usuario Não Autenticado'})
    })

})
/*  
//GET edit
exports.rendereditar= ('/editar/:id',async(req,res) => {
    const id = req.params.id
    const registro = await Users.findById({"_id":id})
    res.render('formeditar', { title: 'Alterar Usuário', registro, action: '/editar/' + registro.id})
})
POST editar user
exports.editar= ('/editar/:id', async (req, res) => {
    const id = req.params.id
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const member = req.params.member
    await Users.updateOne({ _id: id},{ $set: {username: username, email: email, password: password, member: member }})
    res.redirect('/usuarioshtml')
})
 excluir usuario
 exports.excluir= ('/excluir/:id', async (req, res) => {
    const id = req.params.id
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const member = req.params.member
    await Users.deleteOne({ _id: id})
    res.redirect('/usuarioshtml')
 })
 */