//DEFINE EL ESQUEMA DE LOS SUPERHEROES EN MONGODB

//Define el esquema de superhéroe usando Mongoose
import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    nombrePersonaCargo: { type: String, required: true }, //Nuevo campo
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-16' }); //Aquí defines la colección de cada grupo

export default mongoose.model('SuperHero', superheroSchema);