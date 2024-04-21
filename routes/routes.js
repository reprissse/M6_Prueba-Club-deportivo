// Importamos las librerías
import express from "express";
import path from "path";
import fs from "fs";

// Creamos el router
const routes = express.Router()

// Obtenemos el directorio actual
const __dirname = import.meta.dirname

// Ruta principal
routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

// Ruta para obtener deportes
routes.get('/deportes', (req, res) => {
    res.sendFile(path.join(__dirname, "../assets/data/data.json"))
})

// Ruta para agregar deportes
routes.get('/agregar', (req, res) => {
    const {nombre, precio} = req.query
    fs.readFile("./assets/data/data.json", (err, dataSports) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error al leer el archivo')
        } else {
            const {deportes} = JSON.parse(dataSports)
            deportes.push({nombre, precio})
            fs.writeFileSync("./assets/data/data.json", JSON.stringify({deportes}))
            res.send ('agregado')
        }
    })
})

// Ruta para editar deportes
routes.get('/editar', (req, res) => {
    const {nombre, precio} = req.query
    const dataSports = JSON.parse(fs.readFileSync("./assets/data/data.json"))
    const deporte = dataSports.deportes.find(deporte => deporte.nombre === nombre)
    if (deporte) {
        deporte.precio = precio
        fs.writeFileSync("./assets/data/data.json", JSON.stringify(dataSports))
        res.send('editado')
    } else {
        res.status(404).send('Esta pagina no existe')
    }
})

// Ruta para eliminar deportes
routes.get('/eliminar', (req, res) => {
    const {nombre} = req.query
    const dataSports = JSON.parse(fs.readFileSync("./assets/data/data.json"))
    dataSports.deportes = dataSports.deportes.filter(deporte => deporte.nombre !== nombre)
    fs.writeFileSync("./assets/data/data.json", JSON.stringify(dataSports))
    res.send('eliminado')
})

// Exportamos las rutas
export default routes





