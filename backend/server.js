require("dotenv").config({
  path: process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env"
});

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
if (process.env.NODE_ENV !== "test") {
  const connectMongoDB = require("./config/mongo");
  connectMongoDB();

  require("./config/redis");
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/products", productRoutes);


app.get("/", (req,res)=>{
    res.send("Employee Management Backend is Running...");
});
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    server.on("listening", () => {
        console.log("Server is listening...");
    });

    server.on("error", (err) => {
        console.error("Listen Error:", err);
    });

    process.on("exit", (code) => {
        console.log("Process exited with code:", code);
    });

    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });

    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Rejection:", err);
    });
}


module.exports = app;