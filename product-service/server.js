const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3002;

const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Mobile", price: 25000 },
  { id: 3, name: "Headphones", price: 2000 }
];

// Home endpoint
app.get("/", (req, res) => {
  res.send("Product Service is Running");
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "Product Service",
    status: "Healthy"
  });
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Product Service running on port ${PORT}`);
});