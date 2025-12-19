const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  return res.json({
    message: "Acesso autorizado",
    userId: req.userId,
  });
});

module.exports = router;
