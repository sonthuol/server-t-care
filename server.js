const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
//use
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "tcare-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: false }).then(() => {
  console.log("Auto migration");
  // initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "root",
    descriptionRole: "root",
  });

  Role.create({
    id: 2,
    name: "admin",
    descriptionRole: "admin",
  });

  Role.create({
    id: 3,
    name: "doctor",
    descriptionRole: "doctor",
  });
  Role.create({
    id: 4,
    name: "receptionist",
    descriptionRole: "receptionist",
  });
}

app.get("/", (req, res) => {
  res.json({ message: "Wellcome to T-care application" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/clinic.routes")(app);
require("./app/routes/specialty.routes")(app);
require("./app/routes/doctor.routes")(app);
require("./app/routes/schedule.routes")(app);
require("./app/routes/public.clinic.routes")(app);
require("./app/routes/public.specialty.routes")(app);
require("./app/routes/public.doctor.routes")(app);
require("./app/routes/patient.routes")(app);
require("./app/routes/medical_records.routes")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
