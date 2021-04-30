const userRoutes = require('express').Router()
const userController = require('../controllers/userController')


userRoutes.post('/', userController.creatUser)
userRoutes.post('/login' ,userController.login)
userRoutes.get('/verify', userController.userVerify)
userRoutes.put('/profile', userController.userProfile)

module.exports = userRoutes; 