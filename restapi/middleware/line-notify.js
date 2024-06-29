module.exports = async (req, res, next) => {
  await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      "Authorization": "Bearer MeHN6VNE4a3m4CnB2IPJAvly7hNvlMdCCVi9pyzDaGh",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      message: `
        User Logged in
        Group: Node / React / MongoDB
        `,
    }),
  });
  res.json({ message: "alert successfull" });
  next();
};
