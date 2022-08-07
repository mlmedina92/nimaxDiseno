class ItemPedido {
//producto es cada OBJETO del json
//itemPedido es un objeto que tiene otro obj(producto) y una var cantidad
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
 
}

let pedido = [];// guardo cada objeto ItemPedido: objetos productos y sus cant.

//Muestra detalles de los PRODUCTOS con CANTIDADES y el SUBTOTAL y el total de la compra.
function refrescarCarrito() {
//div del modal-body donde se va a guardar el contenido del carrito
  let carrito = document.getElementById("pedido");
  carrito.innerHTML = "";// borro todo el contenido que tiene dentro para actualizarlo

  let contadorCarrito = document.getElementById("contadorCarrito");
  let cant = 0;

  if (pedido.length == 0) {
    carrito.innerHTML = "<p>El presupuesto está vacío</p>";
    contadorCarrito.innerText = "";
  } else {
//For each recorro el arreglo pedido uno a uno cada itemPedido y voy generando html de los pedidos, el contenido del carrito
    pedido.forEach(function (itemPedido) {
//Creo el cont del carrito
      carrito.innerHTML += ` 
              <div class="card border-0 border-bottom mb-3 m-0">
                <div class="row card-body">
                  <div class="col-2">
                    <img src="${
                      itemPedido.producto.imagen //Dentro de la clase ItemPedido esta el obj prod con sus prop.
                    }" class="card-img-top" alt="${itemPedido.producto.nombre}">
                  </div>
                  <div class="col-10">
                    <div class="row">
                      <div class="col-10">
                        <h5 class="card-title">${
                          itemPedido.producto.nombre
                        }</h5>
                      </div>  
                      <div class="col-2 text-end px-0 mx-0">
                        <button id="btn-eliminar-${
                          //Creo un boton con el id de cada prod guardado en itemPedido
                          itemPedido.producto.id
                        }" class="btn"><i class=" fas fa-trash-alt"></i></button>
                      </div>  
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <p class="card-text">x${itemPedido.cantidad}</p>
                      </div>
                    </div>
                </div>
              </div>`;
      cant += itemPedido.cantidad;
    });

// Recorro arreglo pedido para crear eventos.De cada itemPedido capturo el boton eliminar que cree en cada prod 
    pedido.forEach(function (itemPedido) {
      let btnEliminar = document.getElementById(
        `btn-eliminar-${itemPedido.producto.id}`
      );
      btnEliminar.addEventListener("click", () => {// evento clik- boton eliminar.

        Swal.fire({
          title: `¿Estás seguro de quitar ${itemPedido.producto.nombre}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarProducto(itemPedido.producto.id); //llamo a eliminarPproducto, le paso el prod a eliminar
            Swal.fire("Tu producto fue eliminado con éxito");
          }
        });
      });
    });
    contadorCarrito.innerText = cant; //actualizamos con la cantidad total de items en el carrito.
  }
}

//Funcion guardarPedido en localstorage: covierte el itemPedido en string -
//Pedidos es un areglo de objetos en carrito
function guardarPedido(producto, cantidad) {
  //Recorro cada item del arreglo pedido y lo guardo en var itemPedido(sin mayus)
  let itemPedido = pedido.find((item) => item.producto.id == producto.id);
  //Compueba si  existe (para no repetir el producto en el carrito:), le sumas la cantidad solicitada, si no existe se agrega
  if (itemPedido) {
    itemPedido.cantidad += cantidad;
  } else {
    //sino existe, undefined,lo creas
    itemPedido = new ItemPedido(producto, cantidad);
    pedido.push(itemPedido); //guardo itemPedido en arreglo pedido
  }
  //guardo en localstorage pedido : [{el areglo de objetos pedidos}]
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito(); //llama a refrescar carrito
}

// Funcion para eliminar producto del carrito, del arreglo pedido:
function eliminarProducto(id) {
  //recorre item del arreglo pedido con filter , si hay productos con diferente id al recibido lo guardo como pedido en localstorage y ahi llama a refrescar carrito para actualizar su contenido.
  pedido = pedido.filter((item) => item.producto.id != id);
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito();
}

function vaciarCarrito() {
  pedido = [];
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito();
}

//Funcion cargarpedido desde lo que guarde en local storage
function cargarPedido() {
  //Vuelvo objeto al pedido que guarde en el localstorage "pedido"
  let pedidoJson = JSON.parse(localStorage.getItem("pedido")) ?? []; // operador nulish ??
  //un string vacio, 0 undefined da false
  //Recorro cada item de pedidoJson para hacer los new itempedido
  for (const item of pedidoJson) {
    pedido.push(new ItemPedido(item.producto, item.cantidad));
  }
  refrescarCarrito();
}


let btnVaciar = document.getElementById(`btn-clear`);
btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: `¿Estás seguro de vaciar el presupuesto?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire("Presupuesto vaciado con éxito");
    }
  });
});

let btnFinalizar = document.getElementById(`btn-finalizar`);
btnFinalizar.addEventListener("click", () => {
  let txt = "Hola, me gustaría solicitar un presupuesto para:\n";
  pedido.forEach(function (itemPedido) {
    txt +=
      itemPedido.producto.nombre +
      " x" +
      itemPedido.cantidad;
  });
  

  let url = "https://wa.me/2494518737?text=" + encodeURIComponent(txt); //encodeURIComponent reemplaza espacios y caracteres especiales para ser enviados por parámetro en la url.whatsapp.
  window.open(url, "_blank"); // abrir nueva pestaña con la url
});

cargarPedido();

export { guardarPedido };
