class ItemPedido {
  //productos es cada OBJETO del json 
  //Función constructora de OBJETO pedido. Pedido es un objeto que tiene otro obj(producto) y una  variable cantidad
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  //metodos de la clase:
  obtenerSubtotal() {
    return this.producto.precio * this.cantidad;
  }
}

//Arreglo donde guardo cada objeto del tipo ItemPedido :objetos productos y sus cant:
let pedido = [];

//Muestra los detalles de los PRODUCTOS con CANTIDADES y el SUBTOTAL correspondiente y luego el total de la compra.
function refrescarCarrito() {
  //Selecciono el div del modal-body donde se va a guardar el contenido del carrito:
  let carrito = document.getElementById("pedido");
  // borro todo el contenido que tiene dentro para actualizarlo:
  carrito.innerHTML = "";

  let contadorCarrito = document.getElementById('contadorCarrito');
  let cant = 0;

  let totalhtml = document.getElementById("total");
  //En let total voy sumando los subtotales de cada producto:
  let total = 0;

  if(pedido.length == 0) {
    carrito.innerHTML = "<p>El presupuesto está vacío</p>";
    totalhtml.style.display = 'none';
    contadorCarrito.innerText = '';
  } else {
    // Con for each recorro el arreglo pedido. Recorro uno a uno cada itemPedido y voy generando los html de los pedidos osea el contenido del carrito:
    pedido.forEach(function (itemPedido) {
      //CREO EL CONTENIDO DEL MODAL BODY DEL CARRITO:
      carrito.innerHTML += ` 
              <div class="card border-0 border-bottom mb-3 m-0">
                <div class="row card-body">
                  <div class="col-2">
                    <img src="${
                      itemPedido.producto.imagen //DENTRO DE LA CLASE ITEM PEDIDO TENGO EL OBJ PRODUCTO CON SU PROP IMAGEN ,NOMBRE, ETC
                    }" class="card-img-top" alt="${itemPedido.producto.nombre}">
                  </div>
                  <div class="col-10">
                    <div class="row">
                      <div class="col-10">
                        <h5 class="card-title">${itemPedido.producto.nombre}</h5>
                      </div>  
                      <div class="col-2 text-end px-0 mx-0">
                        <button id="btn-eliminar-${ //creo un boton con el id especifico de cada prod guardado en itemPedido
                          itemPedido.producto.id
                        }" class="btn"><i class=" fas fa-trash-alt"></i></button>
                      </div>  
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <p class="card-text">$${itemPedido.producto.precio}</p>
                      </div>
                      <div class="col-4">
                        <p class="card-text">x${itemPedido.cantidad}</p>
                      </div>
                      <div class="col-4 text-end px-0 mx-0">
                        <p class="card-text">$${itemPedido.obtenerSubtotal()}</p>
                      </div>
                    </div>
                </div>
              </div>`;

      // En total sumo los subtotales de cada prod: producto.precio*cantidad de un itemPedido. Sumo el subtotal de todos los itemPedido. llamo al metodo obtener subtotal de la clase itemppedido
      total += itemPedido.obtenerSubtotal();

      cant += itemPedido.cantidad;
    });

    // Recorro el arreglo pedido para crear eventos. por cada itemPedido capturo el boton que cree en cada producto para eliminar:
    pedido.forEach(function (itemPedido) {
      let btnEliminar = document.getElementById(`btn-eliminar-${itemPedido.producto.id}`);
      // Defino evento clik en ese boton para eliminar producto :
      btnEliminar.addEventListener('click', ()=>{
        Swal.fire({
          title: `¿Estás seguro de quitar ${itemPedido.producto.nombre}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarProducto(itemPedido.producto.id);  //llamo a eliminar producto y le paso el prod a eliminar
            Swal.fire('Tu producto fue eliminado con éxito');
          }
        });
      });
    });

    totalhtml.innerHTML = `<p class="text-end px-0 mx-0 fs-4  text">TOTAL $<strong>${total}</strong></p>`;
    totalhtml.style.display = 'block';

    contadorCarrito.innerText = cant; // actualizamos con la cantidad ttal de items en el carrito.
  }

}

// Funcion guardar pedido en localstorage: covierte el itempedido en string -
//pedidos es un areglo de objetos en carrito
function guardarPedido(producto, cantidad) {
  //recorro uno a uno cada item del arreglo pedido y lo guardo en var itemPedido(sin mayus)
  let itemPedido = pedido.find(item => item.producto.id == producto.id);
  // si itemPedido es != a undefined. compueba si ya existe (para no repetir el producto en el carrito:), le sumas la cantidad solicitada:
   if (itemPedido){
     itemPedido.cantidad += cantidad;
   } else { //sino existe, undefined. Lo creas:
     itemPedido = new ItemPedido(producto, cantidad);
     pedido.push(itemPedido); //guardo item pedido en arreglo pedido
    }
    //guardo en localstorage como pedido : [{el areglo de objetos pedidos}]
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito(); //llama a refrescar carrito
  
}

// Funcion para eliminar producto del carrito o del arreglo pedido:
function eliminarProducto(id) {
  //recorre uno a uno los item del arreglo pedido con metodo filter , si hay productos con diferente id al recibido lo guardo como pedido en local storage y ahi llama a refrescar carrito para actualizar su contenido.
  pedido = pedido.filter((item)  => item.producto.id != id);
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito();
}

function vaciarCarrito() {
  pedido = [];
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito();
}

//Funcion cargar pedido desde lo que se guarde en el local storage
function cargarPedido() {
  //Vuelvo objeto al pedido que guarde en el localstorage "pedido"
  // operador nulish ??:
  let pedidoJson = JSON.parse(localStorage.getItem("pedido")) ?? [];
  //un string vacio, 0 undefined son false
  //Recorro cada item de pedidoJson para hacer los new itempedido
  for (const item of pedidoJson) {
    pedido.push(new ItemPedido(item.producto, item.cantidad));
  }
  refrescarCarrito();
}

//interaccion cn el usuario, llama a cargarPedido y de ahi ve lo que hay en refrescarCarrito la que llama a refrescar carrito 
let btnVaciar = document.getElementById(`btn-clear`);
btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: `¿Estás seguro de vaciar el presupuesto?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire('Presupuesto vaciado con éxito');
    }
  });
});

let btnFinalizar = document.getElementById(`btn-finalizar`);
btnFinalizar.addEventListener("click", () => {
  let txt = "Hola, me gustaría solicitar un presupuesto para:\n";
  let total = 0;
  pedido.forEach(function (itemPedido) {
    txt += itemPedido.producto.nombre + ' x' + itemPedido.cantidad + ' $' + (itemPedido.producto.precio * itemPedido.cantidad) + '\n';
    total += itemPedido.producto.precio * itemPedido.cantidad;
  });
  txt += '-----------------\n';
  txt += 'Total $' + total;

  let url = 'https://wa.me/2494518737?text=' + encodeURIComponent(txt); // encodeURIComponent reemplaza los espacios y caracteres especiales codificados para ser enviados por parámetro en la url
  window.open(url,'_blank'); // abrir una nueva pestaña con la url
});

cargarPedido();

export { guardarPedido };


