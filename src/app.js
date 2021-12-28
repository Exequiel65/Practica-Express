const express = require('express');
const path = require('path');
const app = express()
const PORT = 3000
/* Recursos estaticos */
app.use(express.static('public'));

/* Template engine */
app.set('view engine', 'ejs') // aclara el motor de plantilla a utilizar
app.set('views', path.join(__dirname, 'views'))



/* Routers */
let routeHome = require('./routes/home')
let adminRoute = require('./routes/admin')


app.use("/", routeHome)
app.use("/admin", adminRoute)



/* Levantar Servidor */

app.listen(PORT, () =>{
    console.log(
        `Servidor levantado 
        http://localhost:${PORT}
        `
    );
})