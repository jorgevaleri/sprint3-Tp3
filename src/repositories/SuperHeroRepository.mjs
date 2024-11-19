//DEFINE LAS OPERACIONES DE CONSULTA PARA EL MODELO DE SUPERHEROE

import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find();
    }

    async buscarPorAtributo(atributo, valor) {
        const query = { [atributo]: new RegExp(valor, 'i') };
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            poderes: { $exists: true, $not: { $size: 0 } }  // Verifica que 'poderes' existe y no está vacío
        });
    }

    //Función para modificar un superhéroe
    async modificarSuperheroe(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }

    // Función para eliminar un superhéroe Id
    async eliminarSuperheroe(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    //Función para eliminar un superhéroe por nombre
    async eliminarSuperheroePorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: new RegExp(nombre, 'i') });
    }
}

export default new SuperHeroRepository();