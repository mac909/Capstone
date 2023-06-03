const asyncHandler = require("express-async-handler");

const Operations = require("../models/operationsModel");

// @desc    Create new operation
// @route   POST /api/operations
// @access  Private/Admin
const createOperation = asyncHandler(async (req, res) => {
	const { operations } = req.body;

	if (operations && Array.isArray(operations) && operations.length > 0) {
		try {
			const createdOperations = await Operations.insertMany(operations);

			res.status(201).json({
				operations: createdOperations,
			});
		} catch (error) {
			res.status(500).json({
				message: "Failed to create operations",
				error: error.message,
			});
		}
	} else {
		res.status(400).json({
			message: "Invalid operation data",
		});
	}
});

// @desc    Get all operations
// @route   GET /api/operations
// @access  Private/Admin
const getOperations = asyncHandler(async (req, res) => {
	const operations = await Operations.find({});

	res.json(operations);
});

// @desc    Get operation by ID
// @route   GET /api/operations/:id
// @access  Private/Admin
const getOperationById = asyncHandler(async (req, res) => {
	const operations = await Operations.find({ jobID: req.params.id });

	if (operations) {
		return res.json(operations);
	} else {
		res.status(404);
		throw new Error("Operation not found");
	}
});

// @desc    Update operation
// @route   PUT /api/operations/:id
// @access  Private/Admin
const updateOperation = asyncHandler(async (req, res) => {
	const { jobID, operation, status } = req.body;

	const operations = await Operations.findById(req.params.id);

	if (operations) {
		operations.jobID = jobID;
		operations.operation = operation;
		operations.status = status;

		const updatedOperation = await operations.save();
		res.json(updatedOperation);
	} else {
		res.status(404);
		throw new Error("Operation not found");
	}
});

// @desc    Delete operation
// @route   DELETE /api/operations/:id
// @access  Private/Admin
const deleteOperation = asyncHandler(async (req, res) => {
	const operations = await Operations.findById(req.params.id);

	if (operations) {
		await operations.deleteOne();
		res.json({ message: "Operation removed" });
	} else {
		res.status(404);
		throw new Error("Operation not found");
	}
});

module.exports = {
	createOperation,
	getOperations,
	getOperationById,
	updateOperation,
	deleteOperation,
};
