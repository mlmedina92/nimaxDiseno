import { guardarPedido } from "./pedido.js";
import { getData } from "./getData.js";

//Función que me lista los elementos del div con id productos
async function listarProductos() {
  let contenedorProductos = document.getElementById("productos");

  const urlParams = new URLSearchParams(window.location.search);
  const categoriaParam = urlParams.get('categoria');

  const productos = await getData(categoriaParam);
  //Primer for each para crear elementos html (cards que muestran cada producto)
  //Le paso cada producto creado (objeto) como parámetro
  productos.forEach(producto => {
    let { imagen, precio, id, nombre,descripcion } = producto;
    //+= es para concatenar al contenido de contenerdorProductos con cada card
    // Desestructuracion:
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
                                                    <input class="form-control" type="number" id="cantidad-${id}" name="quantity" min="1" max="100" value="1">
                                                  </div>                           
                                                  <div class="col-8">
                                                    <a class="btn btn-primary w-100" href="#" id="btn-agregar-${id}"><i class="fa-solid fa-cart-shopping"></i> Cotizar</a>
                                                  </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>`;
                                       
  })

  
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
