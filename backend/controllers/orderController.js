const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const User = require("../models/userModel");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
	if (!req.body.text) {
		res.status(400);
		next(new Error("Bad request"));
	} else {
		const orders = await Order.find({ user: req.user._id });
		res.status(200).send(orders);
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
	const { text } = req.body;
	const order = await Order.create({ text, user: req.user._id });
	res.status(200).send(order);
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	const user = await User.findById(req.user._id);

	// Check if user exists
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	// Check if user is the owner of the order
	if (order.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("User not authorized");
	}

	// Update order
	const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	// Check if order exists
	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}

	const user = await User.findById(req.user._id);

	// Check if user exists
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	// Check if user is the owner of the order
	if (order.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("User not authorized");
	}

	// Delete order
	await order.deleteOne();
	res.status(200).send("Order deleted");
});

module.exports = {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
