var carrito = [];
var addCartButtons = document.getElementsByClassName('agregar-carrito');
for (var i = 0; i < addCartButtons.length; i++) {
    addCartButtons[i].addEventListener('click', addProductToCart);
}

var botonVaciar = document.getElementById('boton-vaciar');
botonVaciar.addEventListener('click', vaciarCarrito);

window.addEventListener('load', loadCartFromStorage);

function addProductToCart(evento) {
    var button = evento.target;
    var producto = button.parentElement.parentElement;
    var titulo = producto.getElementsByClassName('card-producto')[0].innerText;
    var precio = producto.getElementsByClassName('card-precio')[0].innerText;
    var precio = precio.substring(1) 
    var productoAgregado = {
        titulo: titulo,
        precio: precio,
    };
    carrito.push(productoAgregado);
    refreshCart();

    saveCartToStorage();
}

function refreshCart() {
    var carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var carritoElemento = document.createElement('li');
        carritoElemento.classList.add('list-group-item');
        var contenido = `
            <span>${producto.titulo}</span>
            <span>$${producto.precio}</span> 
        `;
        carritoElemento.innerHTML = contenido;
        carritoContainer.appendChild(carritoElemento);
    }
    calcularTotal();

    saveCartToStorage();
}

function vaciarCarrito() {
    carrito = [];
    refreshCart();
    saveCartToStorage();
}

function saveCartToStorage() {
    localStorage.setItem('cart',JSON.stringify(carrito));
}

function loadCartFromStorage() {
    var savedCart = localStorage.getItem('cart');
    if (savedCart) {
        carrito = JSON.parse (savedCart);
        refreshCart();
    }
}

function calcularTotal() {
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
        total += parseInt(carrito[i].precio);
    }
    var totalElemento = document.getElementById('total');
    totalElemento.innerText = total;
}