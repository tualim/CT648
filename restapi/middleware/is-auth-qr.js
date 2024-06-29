const Rac = require("../models/rac");

module.exports = async (req, res, next) => {
  const headerRAC = req.get("RAC");
  console.log(headerRAC);

  if (!headerRAC) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const fetchedRac = await Rac.findOne().sort({ createdAt: -1 });
  console.log(fetchedRac);

  if (headerRAC !== fetchedRac.rac) {
    const error = new Error("Not authenticated RAC incorrect.");
    error.statusCode = 401;
    throw error;
  }
  next();
};
