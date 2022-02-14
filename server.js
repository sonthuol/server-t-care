const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
require("dotenv").config();
//use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "tcare-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Auto migration");
});

app.get("/", (req, res) => {
  res.json({ message: "Wellcome to T-care application" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
