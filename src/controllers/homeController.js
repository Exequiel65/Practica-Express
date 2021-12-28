let {products} = require('../database/data')

const controller = {
    index : (req, res) =>{
        res.render('home')
    }
}

module.exports = controller