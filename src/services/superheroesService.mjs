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

//Servicio para modificar un superhéroe
export async function modificarSuperheroe(id, datosActualizados) {
    return await superHeroRepository.modificarSuperheroe(id, datosActualizados);
}

//Servicio para eliminar un superhéroe
export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminarSuperheroe(id);
}