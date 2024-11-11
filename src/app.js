const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB bağlantısı
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Basit bir GET endpoint'i
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
