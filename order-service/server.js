const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3003;

const orders = [
  {
    id: 101,
    userId: 1,
    productId: 1,
    quantity: 1,
    status: "Confirmed"
  },
  {
    id: 102,
    userId: 2,
    productId: 2,
    quantity: 2,
    status: "Processing"
  },
  {
    id: 103,
    userId: 3,
    productId: 3,
    quantity: 1,
    status: "Delivered"
  }
];

// Home endpoint
app.get("/", (req, res) => {
  res.send("Order Service is Running");
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "Order Service",
    status: "Healthy"
  });
});

// Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get("/api/orders/:id", (req, res) => {
  const order = orders.find(
    o => o.id === Number(req.params.id)
  );

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  res.json(order);
});

// Create a new order
app.post("/api/orders", (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (
    !Number.isInteger(userId) ||
    !Number.isInteger(productId) ||
    !Number.isInteger(quantity) ||
    userId <= 0 ||
    productId <= 0 ||
    quantity <= 0
  ) {
    return res.status(400).json({
      message: "Valid userId, productId and quantity are required"
    });
  }

  const newOrder = {
    id: orders.length
      ? Math.max(...orders.map(o => o.id)) + 1
      : 101,
    userId,
    productId,
    quantity,
    status: "Confirmed"
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order created successfully",
    order: newOrder
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Order Service running on port ${PORT}`);
});