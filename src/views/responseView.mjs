//MODULO PARA FORMATEAR LA RESPUESTA DE SUPERHEROES

export function renderizarSuperheroe(superheroe){
    return{
        ID: superheroe._id,  //Agrego el ID para verlo por Postman
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos,
        "Cargado Por": superheroe.nombrePersonaCargo  //Agregar el nombre de la persona que lo cargo
    }
}

export function renderizarListaSuperHeroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}