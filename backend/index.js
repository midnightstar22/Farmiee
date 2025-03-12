const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');

const app = express();
const port = 5000;

// ✅ Fix CORS Issue
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allowed headers
}));

app.use(express.json());

// Connect to MongoDB
mongoDB().then(() => {
  console.log('Database connection established');
}).catch((err) => {
  console.error('Failed to connect to the database:', err.message);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
