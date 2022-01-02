let {products, writeProductsJSON} = require('../database/data')

const controller = {
    index : (req, res) =>{
        res.render('admin')
    },
    newProduct : (req, res) =>{
        let lastId = 1;
        
        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });

        let {name, descripcion, price, stock, categoria, imagen} = req.body
        let newProduct = {
            id: lastId + 1,
            name,
            descripcion,
            price,
            stock,
            categoria,
            imagen : req.file ? req.file.filename : "default.png"
        }
        
        products.push(newProduct)

        writeProductsJSON(products)
        res.redirect('/admin')
    },
    edit : (req, res) =>{
        let product = products.find(product => +req.params.id === product.id )
        res.render('editerProduct',{
            product
        })
    },
    update : (req, res) =>{
        res.send('hola')
    }
}

module.exports = controller