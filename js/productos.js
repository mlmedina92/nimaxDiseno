import { guardarPedido } from "./pedido.js";

//Clase: molde de objetos
class Producto {
  //Función constructora de objeto (producto):
  constructor(id, nombre, descripcion, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
  }
  //Métodos de la clase:
  obtenerDetalles() {
    return (
      "ID: " +
      this.id +
      "\n" +
      "Nombre: " +
      this.nombre +
      "\n" +
      "Descripción: " +
      this.descripcion +
      "\n" +
      "Precio: $" +
      this.precio
    );
  }
}

//Instanciación del ARREGLO de objetos.
//No guardo los objetos en una variable, los creo y los guardo en una posición del arreglo
let productos = [
  new Producto(
  "p1",
    "Bombas para pisicinas",
 "Disponibles en una gran variedad de modelos. Desarrolladas y fabricadas con materiales de excelente calidad, en sus diferentes versiones estas bombas de agua fueron diseñadas para brindar la mejor relación presión-caudal del mercado, con el mejor rendimiento energético.",
    123,
    "../img/products/bombas.jpg"
  ),
  new Producto(
    "p2",
    "Equipos de filtración",
    "Los filtros de arena de cuarzo para piscinas tienen la funcionalidad de tratar físicamente el agua, eliminando las impurezas que se encuentran en la misma. La gran variedad de modelos, permite adaptación a todo tipo de piscinas.",
    123,
    "../img/products/filtracion.jpg"
  ),
  new Producto(
  "p3",
    "Accesorios de instalación",
    "Esta categoría agrupa todos los accesorios Vulcano, desarrollados para la instalación hidráulica de su piscina. Ponemos a su disposición la amplia variedad de productos Vulcano, que brindan distintas opciones ajustables a todo tipo de proyecto.",
    123,
    "../img/products/instalacion.jpg"
  ),
  new Producto(
  "p4",
    "Decoración y confort",
    "En esta categoría encontramos productos que por su funcionalidad agregan confort a la hora del baño, como así también aquellos destinados a realzar y destacar el atractivo de la piscina.",
    123,
    "../img/products/decoracion.jpg"
  ),
  new Producto(
  "p5",
    "iluminación",
    "La gran variedad de luminarias para piscina Vulcano, para iluminación subacuática, ha sido desarrollada para realzar la belleza y extender el uso en horarios nocturnos para todo tipo de piscinas. De construcción hermética, y fabricadas con materiales de excelente calidad, tienen una prolongada vida útil.",
    123,
    "../img/products/iluminacion.jpg"
  ),
  new Producto(
  "p6",
    "Automatización de piscinas",
    "La tecnología de automatización de piscinas Vulcano está desarrollada para el accionamiento remoto de filtros, salidas auxiliares, luminarias y calefacción.",
    123,
    "../img/products/automatizacion.jpg"
  ),
  new Producto(
  "p7", 
    "Mantenimeinto y limpieza",
    "Esta categoría agrupa todos los productos Vulcano, destinados al cuidado e higiene del agua su piscina. Un amplio catálogo de productos, permite adaptarse a las necesidades puntuales de cada piscina para obtener un agua limpia y cristalina todo el año.",
    123,
    "../img/products/mantenimiento.jpg",
  ),
new Producto(
  "p8",
    "Equipos de desinfeccion",
    "Los equipos de desinfección de piscinas de Vulcano le permitirán mantener el agua en óptimas condiciones a través de la eliminación de microorganismos resistentes a otros procesos químicos con efectos antiicrustantes, alguicidas, bacteriostáticos y estabilizadores de pH.",
    123,
    "../img/products/decoracion.jpg",
),
new Producto(
  "p9",
    "Productos químicos",
    "La línea de productos químicos Vulcor® de Vulcano, ha sido desarrollada para el tratamiento y mantenimiento del agua de piscina. La completa variedad de productos y presentaciones Vulclor, permite adaptarse a todo tipo de necesidades, que bajo correctas condiciones de uso, resulta en un agua limpia y cristalina para el disfrute de los bañistas.",
    123,
    "../img/products/quimicos.jpg",
  ),
  new Producto(
  "p10",
    "Climaticación de piletas",
    "Productos Vulcano utilizados para calefaccionar y medir la temperatura del agua de piscina.",
    123,
    "../img/products/climatizacion.jpg"
  ),
]
//Función que me lista los elementos del div con id productos
function listarProductos() {
  let contenedorProductos = document.getElementById("productos");
  //Primer for each para crear elementos html (cards que muestran cada producto)
  //Le paso cada producto creado (objeto) como parámetro
  productos.forEach((producto) => {
    let { imagen, precio, id, nombre,descripcion } = producto;
    //+= es para concatenar al contenido de contenerdorProductos con cada card
    // Desestructuracion-desafio:
    contenedorProductos.innerHTML += `<div class="card border rounded overflow-hidden">
                                          <img src="${imagen}" class="card-img-top" alt="${nombre}">
                                          <div class="card-body d-flex flex-column d-flex justify-content-between">
                                            <h5 class="card-title">${nombre}</h5>
                                            <p class="card-text">${descripcion}</p>
                                            <p class="card-text">$${precio}</p>
                                            <div class="row mb-2 d-flex justify-content-between"
                                              <div class="row">
                                                <label for="quantity">Cantidad</label>
                                              </div>
                                              <div>
                                              <input type="number" id="cantidad-${id}  name="quantity" min="1" value="1" class="rounded col-3">
                                                  <a href="#" id="btn-agregar-${id}" class="btn btn-primary col-8"><i class="fa-solid fa-cart-shopping"></i></a>
                                              </div>
                                            </div> 
                                          </div>
                                        </div>`;
  });
  //Segundo for each para vincular eventos al htlm generado arriba:
  //Le paso cada producto creado (objeto) como parámetro  y selecciono el elemento boton
  productos.forEach((producto) => {
    //desestructuracion de objetos- desafio:
    let { id, nombre } = producto;
    let btnAgregar = document.getElementById(`btn-agregar-${id}`);
    btnAgregar.addEventListener("click", () => {
      // Cada vez que se hace clik en el boton, se agrega AL PEDIDO carrito un nuevo objeto del tipo ItemPedido
      let cantidad = document.getElementById(`cantidad-${id}`);
      guardarPedido(producto, parseInt(cantidad.value));
      Swal.fire({
        text: `El producto ${nombre} se añadió con éxito`,
        icon: "success",
        confirm: "ok",
        timer: 4000,
      });
    });
  });
}
//interaccion con el usuario :
listarProductos();
