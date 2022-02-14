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

app.route("/", (req, res) => {
  res.json({ message: "Wellcome to T-care application" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
