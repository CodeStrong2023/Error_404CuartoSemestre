document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Pollo', descripcion: 'Pollo Asado', precio: 23000, imagen: '/images/pollo.jfif' },
        { id: 2, nombre: 'Empanadas', descripcion: 'Empanadas', precio: 200, imagen: 'images/empanadas.jpeg' },
        { id: 3, nombre: 'Pizza Especial', descripcion: 'Pizza Especial', precio: 300, imagen: 'images/pizzaEspecial.jfif' },
        { id: 4, nombre: 'Pizza 4 quesos', descripcion: 'Pizza 4 quesos', precio: 400, imagen: 'images/pizza4quesos.jfif' },
        { id: 5, nombre: 'Pizza Rucula', descripcion: 'PizzaRucula ', precio: 500, imagen: 'images/pizzaRucula.png' },
        { id: 6, nombre: 'Ravioles', descripcion: 'Ravioles ', precio: 600, imagen: 'images/ravioles.jpeg' },
        { id: 7, nombre: 'Fideos Con Salsa Bolognesa', descripcion: 'Fideos Con Salsa ', precio: 700, imagen: 'images/fideos.jpeg' },
    ];

    const productosContainer = document.getElementById('productos');
    const carrito = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const cantidadCarrito = document.getElementById('cantidad-carrito');
    const carritoBtn = document.getElementById('carrito');
    const modalCarrito = document.getElementById('modal-carrito');
    const closeModalBtn = document.querySelector('.close');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); 
    const comprarBtn = document.getElementById('comprar-carrito'); // Botón de comprar

    // Renderizar los productos en el DOM
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}. Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Añadir al carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });

    // Añadir productos al carrito
    productosContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === productoId);
            carrito.push(producto);
            actualizarCarrito();
        }
    });

    // Mostrar el modal del carrito
    carritoBtn.addEventListener('click', () => {
        modalCarrito.style.display = 'flex';
    });

    // Cerrar el modal
    closeModalBtn.addEventListener('click', () => {
        modalCarrito.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modalCarrito) {
            modalCarrito.style.display = 'none';
        }
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    // Actualizar el carrito en el DOM
    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.classList.add('producto-carrito');
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
                <span>${producto.nombre} - $${producto.precio}</span>
            `;
            listaCarrito.appendChild(li);
        });
        cantidadCarrito.textContent = carrito.length;
    }

    // Evento para el botón de comprar
    comprarBtn.addEventListener('click', () => {
        if (carrito.length > 0) {
            // Crear un array con los productos en el carrito
            const items = carrito.map(producto => ({
                title: producto.nombre,
                unit_price: producto.precio,
                quantity: 1 // Asegúrate de enviar un número
            }));

            console.log('Enviando al servidor:', items); // Log para verificar los datos

            // Enviar los datos al servidor para crear la preferencia de MercadoPago
            fetch('/create_preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items }) // Enviar los productos al servidor
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // Redirigir a MercadoPago
                    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}`;
                } else {
                    console.error('Error al crear la preferencia de pago:', data);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('El carrito está vacío.');
        }
    });
});
