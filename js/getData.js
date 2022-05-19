// Consulta a una ruta relativa mediante fetch del archivo prod.json, el cual se pasa por parámetro.
const getData = async (jsonName) => {
    try {
        const response = await fetch("./data/"+jsonName+".json");//link a ruta relativa - AWAY : esperar rta de esa consulta. Lo que obtengo lo guardo en una variable. Esperar hasta obtener un dato o un error(se captura x el catch).
        const data = await response.json();// Response está almacenada en formato json(stok.json ·"color":"rojo"). Tengo q parsear esos datos a un formato de array de objetos . Response sigue siendo una promesa entonces le agrego AWAY. Lo guardo en const data donde se va a almacenar el array de objetos: los productos.
        return data; //Al invocar esta función obtengo el array de objetos productos con sus prop.
    } catch (error) {
        console.log('Hubo un error', error) // Si hay algun error no entra a try sino a catch.
    }
}

// exporto la funcion para usar en otro lado.
export { getData }
