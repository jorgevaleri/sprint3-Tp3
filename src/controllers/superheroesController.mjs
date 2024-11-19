//CONTROLADORES QUE GESTIONAN LA SOLICITUDES HTTP Y LLAMAN A LOS SERVICIOS

//Importa los servicios y vistas necesarias para el manejo de datos y respuestas
import {
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    modificarSuperheroe, 
    eliminarSuperheroe,
    eliminarSuperheroePorNombre
} from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import SuperHero from '../models/SuperHero.mjs';
import {body, validationResult} from 'express-validator'; //Importamos express-validator



//Controlador para obtener un superhéroe por ID
export async function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send("Superhéroe no encontrado");
    }
}

//Controlador para obtener todos los superhéroes
export async function obtenerTodosLosSuperheroesController(req, res) {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes));
}

//Controlador para buscar superhéroes por un atributo específico
export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params; // Asegúrate de usar params si la ruta es con "/:atributo/:valor"
    console.log('Buscando por atributo:', atributo, 'con valor:', valor); // Debug
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    } else {
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}

//Controlador para obtener superhéroes mayores de 30 años
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        console.error("Error al obtener superhéroes mayores de 30:", error);
        res.status(500).send({ mensaje: "Error al obtener superhéroes mayores de 30", error });
    }
}

//Controlador para agregar un superhéroe
export async function agregarSuperheroeController(req, res) {
    // try {
    //     const nuevoSuperheroe = new SuperHero(req.body);
    //     await nuevoSuperheroe.save();
    //     res.status(201).send({ mensaje: "Superhéroe agregado exitosamente", superheroe: nuevoSuperheroe });
    // } catch (error) {
    //     res.status(500).send({ mensaje: "Error al agregar superhéroe", error });
    // }

    //Validación de los datos del cuerpo de la solicitud
    await body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres')
        .run(req);

    await body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es requerido')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres')
        .run(req);

    await body('edad')
        .trim()
        .notEmpty().withMessage('La edad es requerida')
        .isNumeric().withMessage('La edad debe ser un número')
        .custom(value => value >= 0).withMessage('La edad no puede ser negativa')
        .run(req);

    await body('poderes')
        .isArray({ min: 1 }).withMessage('Debe haber al menos un poder')
        .custom((poderes) => {
            return poderes.every(poder => {
                return typeof poder === 'string' && poder.trim().length >= 3 && poder.trim().length <= 60;
            });
        }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
        .run(req);

    //Comprobar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const nuevoSuperheroe = new SuperHero(req.body);
        await nuevoSuperheroe.save();
        res.status(201).send({ mensaje: "Superhéroe agregado exitosamente", superheroe: nuevoSuperheroe });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar superhéroe", error });
    }
}

//Controlador para modificar un superhéroe
export async function modificarSuperheroeController(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;
    // console.log("Datos recibidos para actualizar:", datosActualizados); 

    try {
        const superheroeModificado = await modificarSuperheroe(id, datosActualizados);
        if (superheroeModificado) {
            res.send(renderizarSuperheroe(superheroeModificado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al modificar el superhéroe", error });
    }
}

//Controlador para eliminar un superhéroe por Id
export async function eliminarSuperheroeController(req, res) {
    const { id } = req.params;

    try {
        const superheroeEliminado = await eliminarSuperheroe(id);
        if (superheroeEliminado) {
            res.send({ mensaje: "Superhéroe eliminado exitosamente" });
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}

//Controlador para eliminar un superhéroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;

    try {
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (superheroeEliminado) {
            res.send({ mensaje: "Superhéroe eliminado exitosamente", superheroe: superheroeEliminado });
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}