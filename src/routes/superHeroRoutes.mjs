//DEFINICION DE RUTAS PARA EL MANEJO DE SUPERHEROES

import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    agregarSuperheroeController, //Agregar SuperHéroe
    modificarSuperheroeController, //Modificar SuperHéroe
    eliminarSuperheroeController, //Eliminar SuperHéroe
    eliminarSuperheroePorNombreController, //Eliminar SuperHéroe por nombre
    middleware,
    agregar,
    editHeroeId,
    editarGuardar
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


//Ruta para agregar un superhéroe nuevo
router.post('/heroes', middleware, agregarSuperheroeController);

//Ruta para modificar un superhéroe
router.put('/heroes/:id', middleware, modificarSuperheroeController);

//Ruta para eliminar un superhéroe Id
router.delete('/heroes/:id', eliminarSuperheroeController);

//Ruta para eliminar un superhéroe por nombre
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

//Rutas para vista EJS
router.get('/heroes/agregar', (req,res)=> res.render('addSuperhero'));
router.post('/heroes/agregar', middleware, agregar);

router.get('/editar/:id',editHeroeId)
router.put('/heroes/editarHeroe', editarGuardar);

export default router;