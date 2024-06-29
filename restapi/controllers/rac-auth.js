const Rac = require("../models/rac");
const { randomUUID } = require("crypto");

exports.RacGenQR = async (req, res, next) => {
  const uuid = randomUUID();
  const rac = new Rac({
    rac: "CT648" + uuid,
  });
  console.log(rac);
  try {
    await rac.save();
    res.status(201).json({
      message: "RAC created successfully!",
      rac: rac,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.RacfetchQR = async (req, res, next) => {
  //fetch rac from db and gen QR
  const fetchedRac = await Rac.findOne().sort({ createdAt: -1 });
  console.log(fetchedRac);
  res.status(200).json({ message: "QR fetched.", rac: fetchedRac });
};

// const headerRAC = req.get("RAC");
//   console.log(headerRAC);
//   if (!headerRAC) {
//     const error = new Error("no RAC");
//     error.statusCode = 422;
//     throw error;
//   }
//   if (headerRAC != fetchedRac) {
//     const error = new Error("invalid RAC");
//     error.statusCode = 422;
//     throw error;
//   }
