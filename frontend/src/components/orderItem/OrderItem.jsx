import React from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../features/orders/orderSlice";
import { getOrders } from "../../features/orders/orderSlice";
import { toast } from "react-toastify";

const OrderItem = ({ order }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteOrder(order._id))
			.then(() => {
				dispatch(getOrders());
				toast.success("Task deleted");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="goal">
			<div>{new Date(order.createdAt).toLocaleDateString("en-US")}</div>
			<h2>{order.text}</h2>
			<button onClick={handleDelete} className="close">
				X
			</button>
		</div>
	);
};

export default OrderItem;
