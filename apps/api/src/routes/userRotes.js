const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Acesso autorizado",
    userId: req.userId,
  });
});

module.exports = router;
