const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
	if (!req.body.text) {
		res.status(400);
		next(new Error("Bad request"));
	} else {
		const orders = await Order.find();
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
	const order = await Order.create({ text });
	res.status(200).send(order);
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	const { text } = req.body;
	if (order) {
		order.text = text;
		const updatedOrder = await order.save();
		res.status(200).send(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		res.status(404);
		throw new Error("Order not found");
	}
	await order.deleteOne();
	res.status(200).json({ message: `Order ${req.params.id} removed` });
});

module.exports = {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
