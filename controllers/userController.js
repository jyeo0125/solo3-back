const e = require('express')
const models = require('../models')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const userController = {}

userController.creatUser = async (req, res) =>{
    try {
        const user = await models.user.create({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        
        res.json({user})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

userController.login = async (req, res) =>{
    try {
        const user = await models.user.findOne({
            where:{
                email:req.body.email
            }
        })
        if(user.password === req.body.password){
            res.json({message:'login good in shape', user:user})
        }else{
            res.json({message:'someting wrong with login'})
        }
    } catch (error) {
        console.log(error)
        res.json({error})
        
    }
}

userController.userVerify = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                id:req.headers.authorization
            }
        })
        if (user){
            res.json({user})
        }else{
            res.json({message:' verify not work'})
        }
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

userController.userProfile = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                id: req.headers.authorization
            }
        })
        await user.update({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        res.json({user})
    } catch (error) {
        console.log(error)
        res.json({error})        
    }
}


module.exports = userController; 