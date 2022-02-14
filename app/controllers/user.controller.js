exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.rootBoard = (req, res) => {
  res.status(200).send("Root content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin content");
};

exports.doctorBoard = (req, res) => {
  res.status(200).send("Doctor content");
};

exports.receptionstBoard = (req, res) => {
  res.status(200).send("receptionstBoard content");
};
