import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("INDEX SAYFASI");
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
