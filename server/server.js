import express from "express";
import callbackRoute from "./callback.js";

const app = express();

app.use(express.json());

// ربط الملف
app.use("/", callbackRoute);

app.get("/", (req, res) => {
  res.send("Salla App شغال ✅");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
