const express = require("express");
const router = express.Router();
const {
	createOperation,
	getOperations,
	getOperationById,
	updateOperation,
	deleteOperation,
} = require("../controllers/operationsController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createOperation).get(protect, getOperations);
router
	.route("/:id")
	.get(protect, getOperationById)
	.put(protect, updateOperation)
	.delete(protect, deleteOperation);

module.exports = router;
