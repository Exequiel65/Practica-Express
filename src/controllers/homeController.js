let {products, user, writeUserJSON} = require('../database/data')

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
            imagen : 'default.png'
        }

        user.push(newUser)
        writeUserJSON(user)
        res.redirect('/')
    },
    useres : (req, res) =>{
        res.render('users',{
            users : user
        })
    }
}

module.exports = controller