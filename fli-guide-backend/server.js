const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");
const recipeRouter = require("./routes/recipeRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", recipeRouter);

// Root route for health check
app.get("/", (req, res) => {
   res.send("FLi Guide Backend is running!");
});

// Sync models (optional: set to false if DB already exists)
db.sequelize
   .sync({ alter: false })
   .then(() => {
      console.log("✅ Database synced");
      app.listen(PORT, () => {
         console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
   })
   .catch((err) => {
      console.error("❌ Failed to sync DB:", err);
   });
