// consultamos con fetch el archivo prod.json aca: hago consultas a una ruta relativa
// le paso por parametro el nombre del json:
const getData = async (jsonName) => {
    try {
        const response = await fetch("./data/"+jsonName+".json");// uso el fetch y linkeo mi ruta relativa - AWAY : le digo q espere una rta de esa consulta q se va a hacer medinate el fecth a esa ruta relativa.Guardo lo q obtengo de la consulta en variable response. ESPERA HASTA OBTENER UN DATO O OBTENER UN ERROR donde se va a capturar  x el catch  - el await espera esa consulta y una vez q lo obtiene lo almacena en response.
        const data = await response.json();  // response esta almacenada en formato json(stok.json ·"color":"rojo"). tengo q parsear esos datos:  parsear a un formato de array de objetos con metodo .JSON --- response no es palabra reservada. Response sigue siendo una promesa entonces le agrego el AWAY. lo guardo en const data donde se van a almacenar el array de objetos: los productos.
        return data; //al invocar esta funcion obtengo el array de objetos productos con sus prop.
    } catch (error) {
        console.log('Hubo un error', error) // si hay algun error muestro el error por medio de console.log- no entra a try sino a catch
    }
}

// exporto la funxion q cree pq la voy a usar en otro lado- SI EXPORTO C LLAVES , EN LA OTRA PAG IMPORTO IGUAL C LLAVES :
export { getData }
