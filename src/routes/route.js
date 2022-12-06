const express = require('express')
const controller = require('../controllers/controller')
const router = express.Router()

router.get('/Cadastro', controller.renderIncluir)
router.post('/incluirUsuario',controller.incluir)
router.get('/Destaques', controller.Destaques)
router.get('/', controller.home)
router.get('/Login', controller.Login)
router.post('/LoginAuth', controller.loging)
router.get('/Membro', controller.Membro)
router.get('/Noticias', controller.Noticias)
router.get('/Perfil', controller.Perfil)

//GET edit
/*router.get('/editar/:id', controller.rendereditar)*/
/* POST editar user */
/*router.post('/editar/:id', controller.editar)*/
/* excluir usuario */
/*router.get('/excluir/:id', controller.excluir)*/
module.exports = router
