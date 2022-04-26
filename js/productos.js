import { guardarPedido } from "./pedido.js";

//Clase: molde de objetos
class Producto {
  //Función constructora de objeto (producto):
  constructor(id, nombre, descripcion, fabricante, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fabricante = fabricante;
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
      "Fabricante: " +
      this.fabricante +
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
    "Producto Nº1",
    "Descripción producto Nº1",
    "Fabricante 1",
    123,
    "../img/dos.jpg"
  ),
  new Producto(
    "p2",
    "Producto Nº2",
    "Descripción producto Nº2",
    "Fabricante 2",
    123,
    "../img/dos.jpg"
  ),
  new Producto(
    "p3",
    "Producto Nº3",
    "Descripción producto Nº3",
    "Fabricante 3",
    123,
    "../img/dos.jpg"
  ),
];
//Función que me lista los elementos del div con id productos
function listarProductos() {
  let contenedorProductos = document.getElementById("productos");
  //Primer for each para crear elementos html (cards que muestran cada producto)
  //Le paso cada producto creado (objeto) como parámetro
  productos.forEach((producto) => {
    let { imagen, fabricante, precio, id, nombre,descripcion } = producto;
    //+= es para concatenar al contenido de contenerdorProductos con cada card
    // Desestructuracion-desafio:
    contenedorProductos.innerHTML += `<div class="card border rounded overflow-hidden">
                                          <img src="${imagen}" class="card-img-top" alt="${nombre}">
                                          <div class="card-body">
                                            <h5 class="card-title">${nombre}</h5>
                                            <p class="card-text"><small>${fabricante}</small></p>
                                            <p class="card-text">${descripcion}</p>
                                            <p class="card-text">$${precio}</p>
                                            <label for="quantity">Cantidad</label>
                                            <input type="number" id="cantidad-${id}" name="quantity" min="1" value="1">
                                                <a href="#" id="btn-agregar-${id}" class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i></a>
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
      guardarPedido(producto, cantidad.value);
      swal({
        text: `'El producto ${nombre} se añadó con éxito',`,
        icon: "success",
        confirm: "ok",
        timer: 4000,
      });
    });
  });
}
//interaccion con el usuario :
listarProductos();
