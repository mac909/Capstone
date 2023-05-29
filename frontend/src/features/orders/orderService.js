import axios from "axios";

const API_URL = "/api/orders/";

// Create a new order
const createOrder = async (orderData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, orderData, config);
	return response.data;
};

// Get all orders
const getOrders = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

// Delete an order
const deleteOrder = async (orderId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + orderId, config);
	return response.data;
};

const orderService = {
	createOrder,
	getOrders,
	deleteOrder,
};

export default orderService;
