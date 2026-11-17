import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "My Paid API is running!"
  });
});

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from my API!",
    creator: "sadiarxd"
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API server started");
});
