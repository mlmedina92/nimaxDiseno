//guardarpedido la llama la funcion listarproductos:
import { guardarPedido } from "./pedido.js";
import { getData } from "./getData.js"; // traigo los datos del json

//Función que me lista los elementos del div con id productos
async function listarProductos() {
  let contenedorProductos = document.getElementById("productos");// del archivo productos.hmtl

  const urlParams = new URLSearchParams(window.location.search); //busqueda de parametros
  const categoriaParam = urlParams.get('categoria');  // traigo los parametros de categoria

  const productos = await getData(categoriaParam);//tengo un json con todos los objetos literales- get data trae esos datos, le paso por parametro la categoria correspondiente (piletas o accesorios)

//for each recorre uno a uno cada producto del array productos que traje del JSON, para crear elementos html (cards que muestran CADA producto)
  productos.forEach(producto => { // Desestructuracion para acceder a prop de c/ obj producto
    let { imagen, precio, id, nombre,descripcion } = producto;
//+= es para concatenar al contenido de contenerdorProductos con cada card:
    contenedorProductos.innerHTML += `<div class="col p-2 m-0">
                                        <div class="card border rounded">
                                          <img src="${imagen}" class="card-img-top" alt="${nombre}">
                                          <div class="card-body">
                                            <h5 class="card-title">${nombre}</h5>
                                            <p class="card-text">${descripcion}</p>
                                          </div>
                                            <div class="card-footer p-3">
                                              <p class="card-text"><strong>$${precio}</strong></p>
                                              <div class="container p-0">
                                                <div class="row align-items-end">
                                                  <div class="col-4 pe-0">
                                                    <label class="form-label" for="cantidad-${id}">Cant.</label>
                                                    <input class="form-control" type="number" id="cantidad-${id}" name="quantity" min="1" max="100" oninput="validity.valid||(value='');" value="1">
                                                  </div>
                                                  <div class="col-8">
                                                    <a class="btn btn-primary w-100" href="#" id="btn-agregar-${id}"><i class="fa-solid fa-cart-shopping"></i> Cotizar</a>
                                                  </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>`;
  });

  //for each para vincular eventos al htlm generado, a las cards. recorro cada producto de productos 
  productos.forEach((producto) => {
    let { id, nombre } = producto;     //desestructuracion de objetos:
    let btnAgregar = document.getElementById(`btn-agregar-${id}`);// selecciono boton de c/ producto
    btnAgregar.addEventListener("click", () => {
  // Cada  clik que se hace en el boton, se agrega AL PEDIDO carrito un nuevo objeto del tipo ItemPedido
      let cantidad = document.getElementById(`cantidad-${id}`);// el valor que el us ingresa en input
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
listarProductos(); // llamo a listarProductos
