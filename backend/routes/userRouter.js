const expess = require("express");
const router = expess.Router();
const {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);

router.post("/login", loginUser);

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

module.exports = router;
