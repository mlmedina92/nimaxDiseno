// 2)aca vamos  a hacer el fetch del archivo prod.json aca ya usamos then y todo lo demas:hago consultas a una ruta relativa

const getData = async (jsonName) => {
    try {
        const response = await fetch("../data/"+jsonName+".json");// uso el fetch y linkeo mi rUta relativa - AWAY : le digo q espere una rta de esa consulta q se va a hacer medinate el fecth a esa ruta relativa, guardo lo q obtengo de la consulta en variable response. ESPERA HASTA OBTENER UN DATO O OBTENER UN ERROR donde se va a capturar  x el catch  - el await espera esa consulta y una vez q lo obtiene lo almacena en response.
        const data = await response.json();  // response esta almacenada en formato json(stok.json ·"color":"rojo"). tengo q parsear esos datos:  parsear a un formato de array de obejtos con metodo .JSON --- response no es palabra reservada. vuelvo objeto el array de productos . response sigue siendo una promesa entonces le agrego el AWAY. lo guardo en const data donde se van a almacenar el array de objetos
        return data; //al invocar esta funcion obtengo el array de objetos prodductos
    } catch (error) {
        console.log('Hubo un error', error) // si hay algun error muestro el error por medio de console.log- no estra a try sino a catch
    }
}

// exporto la funxion q cree pq la voy a usar en otro lado- SI EXPORTO C LLAVES , EN LA OTRA PAG IMPORTO IGUAL C LLAVES EN LA CONSOLA ME VA A TIRAR ERROR. si quiero usar export import en los links del indexhtml le tengo q poner el atributo ype=module
export { getData }
