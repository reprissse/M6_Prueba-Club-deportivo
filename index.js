// Importamos express
import express from 'express'; 

// Importamos las rutas
import routes from './routes/routes.js'; 

// Creamos la app
const app = express(); 

// Definimos el puerto
const PORT = process.env.PORT || 3009; 

// Usamos las rutas
app.use('/', routes); 

// Iniciamos el servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`)) 

