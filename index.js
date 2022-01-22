
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const BodyParser = require("body-parser");
const validateToken = require("./middlewares/validateToken");
const {Connectdb, db} = require("./db/db");
Connectdb();
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
const AuthRouter = require("./routes/authRoute")

app.use(BodyParser.json());

app.use("/auth", AuthRouter)

app.get("/posts", validateToken, (req, res) => {
  console.log("Token is valid");
  console.log(req.user.user);
  res.send(`${req.user.user} successfully accessed post`);
});

app.use(express.json());
const port = process.env.TOKEN_SERVER_PORT;
app.listen(port, () => {
  console.log(`Authorization Server running on ${port}...`);
});
