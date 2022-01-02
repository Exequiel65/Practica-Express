const req = require('express/lib/request');
let {products, user, writeUserJSON} = require('../database/data')
const fs = require('fs')
let deleteImage = (product, file)=>{
    if(product.imagen){
        if(fs.existsSync("./public/img/avatar/", product.imagen)){
            fs.unlinkSync(`./public/img/avatar/${product.imagen}`)
        }else{
            console.log('No encontré el archivo')
        }
    }
    return file.filename
}

const controller = {
    index : (req, res) =>{
        res.render('home',{
            products
        })
    },
    register : (req, res) =>{
        res.render('register')
    },
    create: (req,res) =>{
        let lastId = 1;
        
        user.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });

        let {name, email, password, rePassword, imagen} = req.body

        let newUser = {
            id : lastId + 1,
            name,
            email,
            password,
            imagen : req.file ? req.file.filename : ""
            
        }

        user.push(newUser)
        writeUserJSON(user)
        res.redirect('/users')
    },
    useres : (req, res) =>{
        res.render('users',{
            users : user
        })
    },
    login : (req, res)=>{
        res.render('login')
    },
    look: (req, res) =>{
        let userId = +req.params.id

        let usuario = user.find(u => u.id === userId)
        res.render('user',{
            usuario
        })
    },
    edit : (req, res)=>{
        let {name, email, password, rePassword, imagen} = req.body
        let file = req.file
        user.forEach(element => {
            if (element.id === +req.params.id) {
                element.name = name
                element.email = email
                element.password = password ? password : element.password
                // element.rePassword = rePassword ? rePassword : element.rePassword
                element.imagen = file ? deleteImage(element, file): element.imagen;

            }
            

        });

        writeUserJSON(user)
        res.redirect('/users')
    }

}

module.exports = controller