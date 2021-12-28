let {products, writeProductsJSON} = require('../database/data')

const controller = {
    index : (req, res) =>{
        res.render('admin')
    },
    newProduct : (req, res) =>{
        let {name, descripcion, price, stock, categoria, imagen} = req.body
        let newProduct = {
            name,
            descripcion,
            price,
            stock,
            categoria,
            imagen : "default.png"
        }
        
        products.push(newProduct)

        writeProductsJSON(products)
        res.redirect('/')
    }
}

module.exports = controller