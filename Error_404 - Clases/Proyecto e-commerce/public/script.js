document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'Aceite seco multiusos', descripcion: 'Descripción del producto 1', precio: 100, imagen: 'images/aceitesecomultiusos.jpg' },
        { id: 2, nombre: 'Agua Micelar', descripcion: 'Descripción del producto 2', precio: 200, imagen: 'images/aguamicelar.png' },
        { id: 3, nombre: 'Agua Micelar', descripcion: 'Descripción del producto 3', precio: 300, imagen: 'images/aguamicelardos.jpg' },
        { id: 4, nombre: 'Agua Micelar', descripcion: 'Descripción del producto 4', precio: 400, imagen: 'images/aguamicelartres.jpg' },
        { id: 5, nombre: 'Ampolla Rejuvenecedora', descripcion: 'Descripción del producto 5', precio: 500, imagen: 'images/ampollasrejuvenecedora.jpg' },
        { id: 6, nombre: 'Crema Anticelulitis', descripcion: 'Descripción del producto 6', precio: 600, imagen: 'images/anticelulitico-Isseimi.jpg' },
        { id: 7, nombre: 'Crema Antiedad', descripcion: 'Descripción del producto 7', precio: 700, imagen: 'images/antiedad.jpg' },
        { id: 8, nombre: 'Base de Maquillaje', descripcion: 'Descripción del producto 8', precio: 700, imagen: 'images/basedemaquilaj.jpg' },
        { id: 9, nombre: 'Base de Maquillaje', descripcion: 'Descripción del producto 9', precio: 700, imagen: 'images/basedemaquillaje.jpeg' },
        { id: 10, nombre: 'Labial', descripcion: '', precio:100 , imagen: 'images/bodegon-labiales-hidratacion-color-kMKH-U140810561542MwF-624x385@MujerHoy.jpg'},
        { id: 11, nombre: 'Crema Facial', descripcion: '', precio:200 , imagen: 'images/CeraVe-facial.jpg'},
        { id: 12, nombre: 'Ampolla facial', descripcion: '', precio: 300, imagen: 'images/col-geno-y-elastina-concentrate-faciales-10-ampollas-2-ml-4923-p.png'},
        { id: 13, nombre: 'Corrector iluminador', descripcion: '', precio:200 , imagen: 'images/correctoriluminadordeojos.jpg'},
        { id: 14, nombre: 'Crema Exfoliante para pies', descripcion: '', precio: 300, imagen: 'images/crema_exfoliante_para_pies.png'},
        { id: 15, nombre: 'Crema de día', descripcion: '', precio: 222, imagen: 'images/CREMA-DE-DIA-TAPA-CERRADA.jpg'},
        { id: 16, nombre: 'Crema reparadora para pies', descripcion: '', precio: 1200 , imagen: 'images/crema-pies-repara-talones-agrietados-web.jpg'},
        { id: 17, nombre: 'Crema antiedad y antifatiga', descripcion: '', precio: 300, imagen: 'images/cremaantiedadyantifatiga.jpg'},
        { id: 18, nombre: 'Crema contorno de ojos', descripcion: '', precio: 1000 , imagen: 'images/cremacontornodeojos.jpeg'},
        { id: 19, nombre: 'Crema corporal', descripcion: '', precio: 500, imagen: 'images/cremacorporaldecoco.png'},
        { id: 20, nombre: 'Crema de manos', descripcion: '', precio: 400 , imagen: 'images/cremademanos.jpg'},
        { id: 21, nombre: 'Crema de manos', descripcion: '', precio: 300 , imagen: 'images/cremademanosiii.jpg'},
        { id: 22, nombre: 'Crema despigmentante', descripcion: '', precio: 300 , imagen: 'images/cremadespigmentante.jpg'},
        { id: 23, nombre: 'Crema Exfoliante', descripcion: '', precio: 300 , imagen: 'images/cremaexfoliante.jpg'},
        { id: 24, nombre: 'Crema Facial', descripcion: '', precio: 300 , imagen: 'images/cremafacialnut.jpg'},
        { id: 25, nombre: 'Crema Hidratante', descripcion: '', precio: 300 , imagen: 'images/cremahidratante.webp'},
        { id: 26, nombre: 'Crema Reafirmante', descripcion: '', precio: 300 , imagen: 'images/cremareafirmante.jpg'},
        { id: 27, nombre: 'Serum Facial', descripcion: '', precio: 300 , imagen: 'images/dermaglos_facial_serum_acido_hialuronico_7_imagen8.jpg'},
        { id: 28, nombre: 'Exfoliante Corporal', descripcion: '', precio: 300 , imagen: 'images/exfoliantecorporaldecafe.jpg'},
        { id: 29, nombre: 'Exfoliante', descripcion: '', precio: 300 , imagen: 'images/exfoliantee.jpg'},
        { id: 30, nombre: 'Gel refrescante para ojos', descripcion: '', precio: 300 , imagen: 'images/gelrefrescanteparaojos.jpg'},
        { id: 31, nombre: 'Labial Hidratante', descripcion: '', precio: 300 , imagen: 'images/labialhidratante.jpeg'},
        { id: 32, nombre: 'Limpiador facial', descripcion: '', precio: 300 , imagen: 'images/limpiadorfacial.jpeg'},
        { id: 33, nombre: 'Limpiador facial espumoso', descripcion: '', precio: 300 , imagen: 'images/limpiadorfacilespumoso.jpg'},
        { id: 34, nombre: 'Locion Corporal', descripcion: '', precio: 300 , imagen: 'images/locioncorporal.png'},
        { id: 35, nombre: 'Locion Corporal con Manteca', descripcion: '', precio: 300 , imagen: 'images/locioncorporalconmanteca.jpeg'},
        { id: 36, nombre: 'Locion Hidratante para el Cuerpo', descripcion: '', precio: 300 , imagen: 'images/locionhidratanteparaelcuerpo.jpg'},
        { id: 37, nombre: 'Mascarilla de Carbono Activado', descripcion: '', precio: 300 , imagen: 'images/mascarilladecarbonactivado.jpeg'},
        { id: 38, nombre: 'Mascarilla Facial', descripcion: '', precio: 300 , imagen: 'images/mascarillafacial.png'},
        { id: 39, nombre: 'Mascarilla Facial', descripcion: '', precio: 300 , imagen: 'images/mascarillafaciall.jpg'},
        { id: 40, nombre: 'Crema Facial de Noche-Antiedad', descripcion: '', precio: 300 , imagen: 'images/NIVEA-cellular_expert_lift-facial.jpg'},
        { id: 41, nombre: 'Crema Limpiadora Facial', descripcion: '', precio: 300 , imagen: 'images/oferta1.jfif'},
        { id: 42, nombre: 'Sérum Con Ácido Hialurónico', descripcion: '', precio: 300 , imagen: 'images/oferta2.jfif'},
        { id: 43, nombre: 'Peeling Facial', descripcion: '', precio: 300 , imagen: 'images/peelingfacial.jpg'},
        { id: 44, nombre: 'Protector Solar', descripcion: '', precio: 300 , imagen: 'images/protectorsolar.jpg'},
        { id: 45, nombre: 'Protector Solar', descripcion: '', precio: 300 , imagen: 'images/protectorsolar2.webp'},
        { id: 46, nombre: 'Aceite Facial', descripcion: '', precio: 300 , imagen: 'images/rosa-mosqueta1.jpg'},
        { id: 47, nombre: 'Exfoliante Corporal de Sal Marina', descripcion: '', precio: 300 , imagen: 'images/Sal-marina-mar-muerto.jpg'},
        { id: 48, nombre: 'Sérum Niacinamida Facial', descripcion: '', precio: 300 , imagen: 'images/Serumdeniacinamida-manchas.jpg'},
        
    ];
        
    // Obtén el contenedor de productos y otras referencias necesarias
const productosContainer = document.getElementById('productos');
const carrito = [];
const listaCarrito = document.getElementById('lista-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const carritoBtn = document.getElementById('carrito');
const modalCarrito = document.getElementById('modal-carrito');
const closeModalBtn = document.querySelector('.close');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const items = document.querySelectorAll('.carrusel-item'); // Selecciona todas las imágenes del carrusel
const comprarBtn = document.getElementById('comprar'); // Botón de comprar
let indiceActual = 0; // Define el índice actual para el carrusel
let total = 0; // Variable para almacenar el total
let totalDescuento = 0; // Variable para almacenar el total con descuento

// Renderizar los productos en el DOM
productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');
    productoElement.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion || 'Sin descripción'}. Precio: $${producto.precio}</p>
        <button data-id="${producto.id}">Añadir al carrito</button>
    `;
    productosContainer.appendChild(productoElement);
});

// Lógica del buscador
document.getElementById('search-form').addEventListener('submit', function () {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm)
    );

    // Limpiar el contenedor de productos
    productosContainer.innerHTML = '';

    // Renderizar los productos filtrados
    productosFiltrados.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion || 'Sin descripción'}. Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Añadir al carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
});

// Mostrar un slide específico
function showSlide(n) {
    const totalItems = document.querySelectorAll('.carrusel-item').length;
    if (n >= totalItems) indiceActual = 0;
    if (n < 0) indiceActual = totalItems - 1;
    document.querySelector('.carrusel-inner').style.transform = `translateX(-${indiceActual * 100}%)`;
}

// Mover al siguiente slide
function moverCarrusel() {
    indiceActual = (indiceActual + 1) % items.length;
    showSlide(indiceActual);
}

// Iniciar el carrusel automáticamente
setInterval(moverCarrusel, 3000);

// Eventos de los botones de navegación
document.querySelector('.next').addEventListener('click', () => {
    indiceActual++;
    showSlide(indiceActual);
});

document.querySelector('.prev').addEventListener('click', () => {
    indiceActual--;
    showSlide(indiceActual);
});

// Añadir productos al carrito
productosContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        const producto = productos.find(p => p.id === productoId);

        const productoEnCarrito = carrito.find(p => p.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
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
    let totalProductos = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('producto-carrito');
        li.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
                <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</span>
            </div>
            <button class="quitar" data-id="${producto.id}">❌</button>
        `;
        listaCarrito.appendChild(li);
        totalProductos += producto.cantidad;
    });
    cantidadCarrito.textContent = totalProductos;
}

// Ajustar margen superior al hacer clic en 'text-productos'
document.getElementById('text-productos').addEventListener('click', function() {
    this.style.marginTop = '50px';
});

// Evento para el botón de comprar
comprarBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        const items = carrito.map(producto => ({
            title: producto.nombre,
            unit_price: producto.precio,
            quantity: 1
        }));

        console.log('Enviando al servidor:', items);

        fetch('/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
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

// Evento para quitar un producto del carrito
listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('quitar')) {
        const productoId = parseInt(e.target.getAttribute('data-id'));
        const productoEnCarrito = carrito.find(p => p.id === productoId);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad--;

            if (productoEnCarrito.cantidad === 0) {
                const index = carrito.indexOf(productoEnCarrito);
                carrito.splice(index, 1);
            }
            actualizarCarrito();
        }
    }
});

// Inicializar el carrusel mostrando el primer slide
showSlide(indiceActual);

// Lógica para fijar la navbar al hacer scroll
const navbar = document.querySelector('.navbar');
const sticky = navbar.offsetTop;

const handleScroll = () => {
    if (window.pageYOffset > sticky) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
};

window.addEventListener('scroll', handleScroll);
});