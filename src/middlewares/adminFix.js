
const USER = "USER_ADMIN"

function userAdminCheck (req, res, next){
    if (USER === "USER_ADMIN"){
        next()
    }else{
        res.redirect('/')
    }
}

module.exports = userAdminCheck