
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

// Ruta para el login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        connection.query(query, [email], async (error, results) => {
            if (error) {
                console.error('Error en la consulta:', error);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            if (results.length > 0) {
                // Comparar la contraseña ingresada con la almacenada
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    res.json({ message: 'Inicio de sesión exitoso' });
                } else {
                    res.status(401).json({ error: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    // Verificación de campos
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        connection.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    res.status(500).json({ error: 'Error en el servidor' });
                } else {
                    res.json({ message: 'Usuario registrado exitosamente' });
                }
            }
        );
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
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
