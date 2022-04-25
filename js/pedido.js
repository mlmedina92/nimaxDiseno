class ItemPedido {
  //Función constructora de objetos: pedido
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  //metodos de la clase:
  obtenerSubtotal() {
    return this.producto.precio * this.cantidad;
  }
}
//Arreglo donde guardo los objetos del tipo ItemProducto
let pedido = [];

//Muestra los detalles de los productos con cantidades y el subtotal correspondiente y luego el total de la compra
function refrescarCarrito() {
  //Selecciono el div id=pedido donde se va a guardar el contenido del carrito
  let carrito = document.getElementById("pedido");
  carrito.innerHTML = "";
  //En let total voy sumando los subtotales
  let total = 0;
  //Recorro el arreglo pedido, cada pedido es un item pedido un objeto de la clase Itempedido, genera los html de los pedidos , el contenido del carrito:
  pedido.forEach(function (itemPedido) {
    carrito.innerHTML += ` 
            <div class="card border-0 border-bottom mb-3 m-0">
              <div class="row card-body">
                <div class="col-2">
                  <img src="${
                    itemPedido.producto.imagen
                  }" class="card-img-top" alt="${itemPedido.producto.nombre}">
                </div>
                <div class="col-10">
                  <div class="row">
                    <div class="col-10">
                      <h5 class="card-title">${itemPedido.producto.nombre}</h5>
                    </div>  
                    <div class="col-2 text-end px-0 mx-0">
                      <button id="btn-eliminar-${
                        itemPedido.producto.id
                      }" class="btn-danger"><i class=" fas fa-trash-alt"></i></button>
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

    total += itemPedido.obtenerSubtotal();
  });

  // pedido.forEach(function (itemPedido) {
  //   let btnEliminar = document.getElementById(`btn-eliminar-${producto.id}`);
  //   Defino evento para eliminar producto :
  //   btnEliminar.addEventListener('click', ()=>{
  //     Swal.fire({
  //       title: 'Estás seguro de eliminar este producto?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         eliminarProducto(ItemPedidoproductoid);
  //         Swal.fire(
  //           'Tu producto fue eliminado con éxito',
  //           'success'
  //         )
  //       }
  //     });
  //   });
  // });

  let totalhtml = document.getElementById("total");
  totalhtml.innerHTML = `<p class="text-end px-0 mx-0 fs-4  text">TOTAL $<strong>${total}</strong></p>`;
}

// Funcion guardar pedido en localstorage: covierte el pedido en string -
//Guarda pedidos que es un areglo de objetos en carrito
function guardarPedido(producto, cantidad) {
  pedido.push(new ItemPedido(producto, cantidad));
  localStorage.setItem("pedido", JSON.stringify(pedido));
  refrescarCarrito();
}

//  Funcion para eliminar producto:
// function eliminarProducto(id) {
//  pedido=  pedido.filter((item)  => item.id != `"btn-eliminar-"${itemPedido.producto.id}`);
//   localStorage.setItem("pedido", JSON.stringify(pedido));
//  }

//Funcion cargar pedido desde lo que guarde en el local storage
function cargarPedido() {
  //Vuelvo objeto el pedido que guarde en el storage
  // operador nulish para el desafio ??:
  let pedidoJson = JSON.parse(localStorage.getItem("pedido")) ?? [];
  //un string vacio, 0 undefined son false
  //Recorro el json para hacer los new itempedido
  for (const item of pedidoJson) {
    pedido.push(new ItemPedido(item.producto, item.cantidad));
  }
  refrescarCarrito();
}
// }

//interaccion cn el us llamar a cargar pedido y refrescar el carrito
cargarPedido();

export { guardarPedido };

document.addEventListener("DOMContentLoaded", (event) => {
  swal({
    title: "Hola",
    text: "Bienvenido",
    confirm: "ok",
    timer: 3000,
  });
});
