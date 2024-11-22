import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware para parsear JSON
app.use(express.json());

//Conexión a MongoDB
connectDB();

app.set('views', './views'); // Define el directorio raíz de las vistas
app.set('view engine', 'ejs'); // Usa EJS como motor de vistas
// Middleware para parsear los datos de los formularios
app.use(express.urlencoded({ extended: true }));  // Para formularios con método POST

//Configuración de rutas
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({mensaje: "Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
