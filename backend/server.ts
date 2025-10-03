import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./db/db";
import "./models/Admin";
import "./models/Order";
import adminRouter from "./routes/adminRoutes"; // adjust path if needed
import productRoutes from "./routes/productRoutes";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend running with Sequelize 🚀");
});

// Use Admin router
app.use("/admin", adminRouter);
app.use("/product", productRoutes);

const uploadDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadDir));

const initializeTables = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // Sync models (creates tables if they don’t exist)
    await sequelize.sync({ alter: true });
    console.log("Tables created");
  } catch (err) {
    console.error("DB error:", err);
  }
};

const PORT = 5000;
initializeTables().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
