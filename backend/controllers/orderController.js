const asyncHandler = require("express-async-handler");
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
	if (!req.body.text) {
		res.status(400);
		next(new Error("Bad request"));
	} else {
		res.status(200).send("Get all orders");
	}
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
	res.status(200).send("Get order by id");
});

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
	res.status(200).send("Create order");
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
	res.status(200).send("Update order");
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
	res.status(200).send("Delete order");
});

module.exports = {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
