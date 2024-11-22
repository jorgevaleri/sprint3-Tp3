//SERVICIOS QUE INTERMEDIAN ENTRE CONTROLADORES Y REPOSITORIO

import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

//Servicio para agregar Superhéroes
export async function agregarHeroe(datosHeroe) {
    return await superHeroRepository.agregarDB({
        ...datosHeroe,
        fechaCreacion: new Date(), // Ejemplo de lógica adicional
    });
}

//Servicio para modificar un superhéroe
export async function modificarSuperheroe(id, datosActualizados) {
    return await superHeroRepository.modificarSuperheroe(id, {
        ...datosActualizados,
        ultimaActualizacion: new Date(), // Lógica adicional
        }
    );
}

//Servicio para eliminar un superhéroe por Id
export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminarSuperheroe(id);
}

//Servicio para eliminar un superhéroe por nombre
export async function eliminarSuperheroePorNombre(nombre) {
    return await superHeroRepository.eliminarSuperheroePorNombre(nombre);
}