require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connection = require('./mongoDB');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const Featureds = require('./models/Featured');
const Products = require('./models/Products');
const EmailSender = require('./SendMail');

connection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  Vary: 'Origin',
}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('test server')
});

// GET LIST FEATUREDS
app.get('/api/featureds', (req, res) => {
  Featureds.find().then((data, error) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send(error);
    }
  });
});

// GET LIST PRODUCTS
app.get('/api/products', (req, res) => {
  Products.find().then((data, error) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send(error);
    }
  });
});

// POST EMAIL SENDER
app.post('/api/send', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    EmailSender({ firstName, lastName, email, phone, message });
    res.json({ message: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error Send POST ❌" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));