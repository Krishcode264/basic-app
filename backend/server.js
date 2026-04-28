const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Dummy products JSON
const products = [
  { id: 1, name: "Premium Wireless Headphones", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
  { id: 2, name: "Mechanical Keyboard", price: 149.50, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
  { id: 3, name: "Ergonomic Mouse", price: 79.90, image: "https://images.unsplash.com/photo-1527814050087-179344eb89e6?w=500&q=80" },
  { id: 4, name: "Ultra-wide Monitor", price: 699.00, image: "https://images.unsplash.com/photo-1527443154391-507e9dc6bf9d?w=500&q=80" },
  { id: 5, name: "Desk Mat", price: 29.99, image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500&q=80" },
  { id: 6, name: "Studio Microphone", price: 199.00, image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&q=80" }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/', (req, res) => {
  res.send('Backend API is running. Access /api/products for data.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
