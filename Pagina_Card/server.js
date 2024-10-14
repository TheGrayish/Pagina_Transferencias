const express = require('express');
const stripe = require('stripe')('TU_CLAVE_SECRETA_DE_STRIPE');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS

const app = express();

// Habilita CORS para todas las rutas
app.use(cors()); // Permite solicitudes de cualquier origen (puedes limitarlo si lo deseas)

app.use(bodyParser.json());

// Ruta para procesar el pago
app.post('/procesar_pago', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      source: token,
      description: 'Pago por servicio',
    });

    res.json({ message: 'Pago realizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
