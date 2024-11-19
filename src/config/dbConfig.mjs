//CONEXION A LA BASE DE DATOS MONGODB

//Importa Mongoose
import mongoose from 'mongoose';

//Funcion asincrónica que establece la conexión a la base de datos
export async function connectDB() {
    try {
        //Conexión a MongoDB usando una cadena de conexión
        await mongoose.connect(
            'mongodb+srv://Grupo-16:grupo16@cursadanodejs.ls9ii.mongodb.net/Node-js', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            console.log('Conexión exitosa a MongoDB');
        } catch (error) {
            //Si ocurre un error, se imprime y el proceso se detiene
            console.error('Error al conectar a MongoDB:', error);
            process.exit(1);
        }
    }