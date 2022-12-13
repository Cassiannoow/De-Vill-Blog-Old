const db = require('../database/db')
const user = require('../models/user.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth');
const atuhMiddle = require('../middlewares/auth')
const { ObjectID } = require('bson');
const Users = db.Mongoose.model('esquemaUsers',user.UserSchema,'users')
const Posts = db.Mongoose.model('esquemaUsers',user.PostsSchema,'posts')

function generatetoken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    })
}

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
    const ListaPosts = await Posts.find({}).lean().exec()
    res.render('Home', {ListaPosts})
})
exports.Login = ('/Login.ejs', async(req, res) =>{
    res.render('Login')
})
exports.Membro = ('/Membro.ejs', atuhMiddle, async(req, res) => {
    res.render('Membro')
})
exports.Noticias = ('/Noticias.ejs', async(req, res) => {
    const ListaPosts = await Posts.find({}).lean().exec()
    res.render('Noticias', {ListaPosts})
})
exports.Perfil = ('/Perfil.ejs', atuhMiddle, async(req, res) => {
    const email = req.params.email
    const users = await Users.findOne({email})
    if(!users)
        return res.status(401).send({error: 'Nao achou o pefil'})
    return res.render('Perfil', {users})
    
})

exports.alteraImagem = ('/alterarImagem', atuhMiddle, async(req, res) =>{
    const imagem = req.body.imagem
    const id = req.params.id
    await Users.updateOne({ _id: id},{ $set: {imagem: imagem}})
    const users = await Users.findOne({'_id': ObjectID(id)})
    res.render('Perfil', {user})
})

exports.incluir = ('/incluirUsuario', async(req,res) => {
    try{
        const {email} = req.body
        if(await Users.findOne({email}))
            return res.status(400).send({error: 'User already exists'})
        const user = await Users.create(req.body)

        user.image = req.body.image
        user.member = '0'
        user.password = undefined

        return res.send({
            user,
            token: generatetoken({ id: user.id})
        })
    }
    catch(err){
        return res.status(400).send({error: 'Registration Failed'})
    }
})

exports.criarpost = ('/criarPost', async(req,res) => {
    let title = req.body.title
    let data = new Date.now(dataString)
    let description = req.body.description
    let recently = true
    let iamge = req.body.image
    let usuario = new Posts({title,data,description,recently, iamge})
    try{
        await usuario.save()
        res.redirect('/')
    }
        catch(err){
        next(err)
    }
})

exports.loging = ('/LoginAuth', async(req, res) =>{
    const { email, password} = req.body

    const user = await Users.findOne({email: email}).select('+password')

    if(!user)
    {
        return res.status(400).send({error: 'User not found'})
    }

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid Password'})

    user.password = undefined

    return res.render('Perfil', {user})
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
 */