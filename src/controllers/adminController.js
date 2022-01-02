
const fs = require('fs')
let {products, writeProductsJSON} = require('../database/data')

let deleteImage = (product, file)=>{
    if(product.imagen){
        if(fs.existsSync("./public/img/", product.imagen)){
            fs.unlinkSync(`./public/img/${product.imagen}`)
        }else{
            console.log('No encontré el archivo')
        }
    }
    return file.filename
}

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
            imagen : req.file ? req.file.filename : ""
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
        let productId = +req.params.id
        let {name, descripcion, price, stock, categoria, imagen} = req.body
        let file = req.file
        products.forEach(product =>{
                if (productId === product.id) {
                    console.log(req.file);
                    product.name = name
                    product.descripcion = descripcion
                    product.price = price
                    product.stock = stock
                    product.categoria = categoria
                    product.imagen = req.file ? deleteImage(product, file) : "";
                        
                    }
            }
            
        )
        writeProductsJSON(products)

        res.redirect('/')
    },

    delete : (req, res)=> {
        let productId = +req.params.id

        products.forEach(product => {
			if(product.id === productId){
                if (product.imagen) {
                    if(fs.existsSync("./public/img/", product.imagen)){
                        fs.unlinkSync(`./public/img/${product.imagen}`)
                    }else{
                        console.log('No encontré el archivo')
                    }
                }
				

				let productToDestroyIndex = products.indexOf(product) // si lo encuentra devuelve el indice si no -1
				if(productToDestroyIndex !== -1) {
					products.splice(productToDestroyIndex, 1)
				}else{  // primer parámetro es el indice del elemento a borrar, el segundo, la cantidad a eliminar 
					console.log('No encontré el producto')
				}
			}
		})
        writeProductsJSON(products)
        res.redirect('/')
    }
}

module.exports = controller