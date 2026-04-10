const router = require("express").Router();
const { registerUser, loginUser, adminLogin, getAllUsers } = require("../Controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);
router.get("/all-users", verifyToken, isAdmin, getAllUsers);

module.exports = router;
