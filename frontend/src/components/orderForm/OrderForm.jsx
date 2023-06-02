import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../features/orders/orderSlice";
import { toast } from "react-toastify";

const OrderForm = () => {
	const [text, setText] = useState("");

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(createOrder({ text }));
		setText("");
		toast.success("Task created");
	};
	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="text">Task</label>
					<input
						type="text"
						className="form-control"
						id="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter task"
					/>
				</div>
				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Submit
					</button>
				</div>
			</form>
		</section>
	);
};

export default OrderForm;
