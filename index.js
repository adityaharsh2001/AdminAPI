const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const BodyParser = require("body-parser");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./controllers/generateToken");
const validateToken = require("./middlewares/validateToken");
let refreshTokens = [];
const Connectdb = require("./db/db");
const db = Connectdb();
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);

app.use(BodyParser.json());
app.post("/createApiUser", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const email = req.body.email;
  const total_order = req.body.total_order;
//   const created_at = new Date.toDateString();
  //   users.push({ user: user, password: hashedPassword });
  const users = { user_id: uuidv4(), user_name: user, user_email: email, user_password: hashedPassword,  total_order: total_order};
  var sql = "SELECT user_email FROM users HAVING user_email"
  const user_email = db.query(sql, email, err => {
      if(err) throw err;
  })
  if(user_email) {
    // res.status(422).send("User Already Exists with")
  }
  else {
    db.query(`INSERT INTO users SET ?`, users, err => {
        if(err) throw err;
        console.log("user added")
    })
  }
  res.status(201).send(users);
  console.log(users);
});

app.post("/login", async (req, res) => {
  const user = users.find((c) => c.user == req.body.name);
  //check to see if the user exists in the list of registered users
  if (user == null) res.status(404).send("User does not exist!");
  //if user does not exist, send a 400 response
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ user: req.body.name });
    const refreshToken = generateRefreshToken({ user: req.body.name });
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).send("Password Incorrect!");
  }
});

app.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token))
    res.status(400).send("Refresh Token Invalid");
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);
  //remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({ user: req.body.name });
  const refreshToken = generateRefreshToken({ user: req.body.name });
  //generate new accessToken and refreshTokens
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
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
