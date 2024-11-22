// CONTROLADORES QUE GESTIONAN LAS SOLICITUDES HTTP Y LLAMAN A LOS SERVICIOS
import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    modificarSuperheroe,
    eliminarSuperheroe,
    eliminarSuperheroePorNombre,
    agregarHeroe,
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperHeroes } from '../views/responseView.mjs';

// Controlador para obtener superhéroe por ID
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.send(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroe', error: error.message });
    }
}

// Controlador para obtener todos los superhéroes
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes', error: error.message });
    }
}

// Controlador para buscar superhéroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (!superheroes.length) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        res.send(renderizarListaSuperHeroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar superhéroes', error: error.message });
    }
}

// Controlador para obtener superhéroes mayores de 30 años
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.send(renderizarListaSuperHeroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

// Controlador para agregar un nuevo superhéroe
export async function agregarSuperheroeController(req, res) {
    try {
        const nuevoHeroe = req.body;
        const heroeCreado = await agregarHeroe(nuevoHeroe);

        if (!heroeCreado) {
            return res.status(400).json({ mensaje: 'Error al agregar el superhéroe' });
        }
        res.status(201).send({ mensaje: 'Superhéroe agregado exitosamente', heroe: heroeCreado });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al agregar superhéroe', error: error.message });
    }
}

// Controlador para modificar un superhéroe
export async function modificarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const heroeActualizado = await modificarSuperheroe(id, datosActualizados);

        if (!heroeActualizado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado o no se pudo actualizar' });
        }
        res.status(200).json({ mensaje: 'Superhéroe actualizado con éxito', datos: heroeActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

// Controlador para eliminar un superhéroe por ID
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;

        const heroeEliminado = await eliminarSuperheroe(id);

        if (!heroeEliminado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json({ mensaje: 'Superhéroe eliminado con éxito', datos: heroeEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

// Controlador para eliminar un superhéroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;

        const heroeEliminado = await eliminarSuperheroePorNombre(nombre);

        if (!heroeEliminado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado con ese nombre' });
        }
        res.status(200).json({ mensaje: 'Superhéroe eliminado con éxito', datos: heroeEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

// Controlador para manejar la vista de agregar un superhéroe
export async function agregar(req, res) {
    try {
        const datosHeroe = req.body;
        const guardar = await agregarHeroe(datosHeroe);

        if (!guardar) {
            return res.status(400).json({ mensaje: 'Error al guardar el superhéroe' });
        }
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

// Controlador para editar un superhéroe por ID
export async function editHeroeId(req, res) {
    try {
        const { id } = req.params;
        const datosHeroe = await obtenerSuperheroePorId(id);

        if (!datosHeroe) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        res.render('editSuperheroe', { datosHeroe });
    } catch (error) {
        res.status(500).send('Ocurrió un error', error);
    }
}

// Controlador para guardar la edición de un superhéroe
export async function editarGuardar(req, res) {
    try {
        const datosActualizados = req.body;
        const actualizado = await modificarSuperheroe(datosActualizados.id, datosActualizados);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado o no se pudo actualizar' });
        }
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

export async function middleware(req, res, next) {
    // Ejecuta las validaciones
    await body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres')
        .run(req);

    await body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres')
        .run(req);

    await body('edad')
        .trim()
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor a 0')
        .run(req);

    await body('poderes')
        .isArray().withMessage('Los poderes deben ser un arreglo')
        .notEmpty().withMessage('El arreglo de poderes no debe estar vacío')
        .custom((value) => {
            // Verifica que todos los elementos sean cadenas de texto
            return value.every(poder => typeof poder === 'string' && poder.trim().length >= 3 && poder.trim().length <= 60);
        })
        .withMessage('Cada poder debe ser una cadena con una longitud de entre 3 y 60 caracteres, sin espacios al inicio o al final')
        .custom((value) => {
            // Verifica que no haya elementos con espacios al inicio o al final
            return value.every(poder => poder.trim() === poder);
        })
        .withMessage('Cada poder no debe tener espacios al principio o al final')
        .run(req);

    // Verifica si hubo errores en las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, retorna un mensaje de error con los detalles
        return res.status(400).json({ errors: errors.array() });
    }

    // Si no hubo errores, pasa al siguiente middleware o controlador
    next();
}