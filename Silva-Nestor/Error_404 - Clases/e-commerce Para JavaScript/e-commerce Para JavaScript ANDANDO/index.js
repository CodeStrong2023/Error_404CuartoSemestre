
//TEST-611293474547339-080208-1b6184f4ae164593ecc2b32f49bc9492-638769043
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const port = 3000;

// Configuración de MercadoPago
const client = new MercadoPagoConfig({
    accessToken: 'TEST-611293474547339-080208-1b6184f4ae164593ecc2b32f49bc9492-638769043' // Reemplaza con tu token de acceso
});

// Middleware para servir archivos estáticos y manejar JSON
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Reemplaza con tu usuario
    password: '193756428Lin', // Reemplaza con tu contraseña
    database: 'ecommerce'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

// Ruta para crear la preferencia de pago con MercadoPago
app.post('/create_preference', async (req, res) => {
    try {
        const items = req.body.items.map(item => ({
            title: item.title,
            unit_price: Number(item.unit_price),
            quantity: Number(item.quantity),
            currency_id: "ARS"
        }));

        const body = {
            items,
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: 'approved'
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
});

// Ruta para manejar el éxito del pago
app.get('/success', (req, res) => {
    res.send('Pago exitoso!');
});

// Ruta para manejar el fallo del pago
app.get('/failure', (req, res) => {
    res.send('El pago falló. Inténtalo nuevamente.');
});

// Ruta para manejar pagos pendientes
app.get('/pending', (req, res) => {
    res.send('El pago está pendiente.');
});

// Cerrar conexión al finalizar el servidor
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
