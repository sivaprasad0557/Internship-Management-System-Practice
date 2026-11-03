const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3001;

const users = [
  { id: 1, name: "Siva", email: "siva@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" },
  { id: 3, name: "Priya", email: "priya@example.com" }
];

// Home endpoint
app.get("/", (req, res) => {
  res.send("User Service is Running");
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "User Service",
    status: "Healthy"
  });
});

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find(
    u => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`User Service running on port ${PORT}`);
});