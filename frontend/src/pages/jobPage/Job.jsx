import React from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../../features/jobs/jobSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Job = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		customer: "Kroger",
		description: "TBars",
		dueDate: "",
		poNumber: "123",
		quantity: 10,
		price: 10,
		operations: [],
		status: "Open",
		notes: "",
	});

	const { customer, description, dueDate, poNumber, quantity, price } =
		formData;

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "quantity" || name === "price") {
			if (!isNaN(value)) {
				setFormData({ ...formData, [name]: Number(value) });
			}
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(createJob(formData));
			setFormData({
				customer: "",
				description: "",
				dueDate: "",
				poNumber: "",
				quantity: 0,
				price: 0,
				operations: [],
				status: "Open",
				notes: "",
			});
			toast.success("Job created successfully");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<section className="heading">
				<h1>New Order Entry</h1>
				<p>Please fill out the below</p>
			</section>
			<section>
				<form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
					<div>
						<label htmlFor="customer">Customer</label>
						<input
							type="text"
							id="customer"
							name="customer"
							value={customer}
							onChange={onChange}
							placeholder="Customer Name"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Description"
							value={description}
							onChange={onChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="poNumber">PO Number</label>
						<input
							type="text"
							id="poNumber"
							name="poNumber"
							placeholder="PO Number"
							value={poNumber}
							onChange={onChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="dueDate">Due Date</label>
						<input
							type="date"
							id="dueDate"
							name="dueDate"
							placeholder="Due Date"
							value={dueDate}
							onChange={onChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="quantity">Quantity</label>
						<input
							type="number"
							id="quantity"
							name="quantity"
							placeholder="Quantity"
							value={Number(quantity)}
							onChange={onChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="pricePerUnit">Price Per Unit</label>
						<input
							type="number"
							id="price"
							name="price"
							placeholder="Price Per Unit"
							value={Number(price)}
							onChange={onChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="col-span-2">
						<input
							type="submit"
							value="Submit"
							className="w-full px-4 py-2 bg-black text-white rounded-md cursor-pointer"
						/>
					</div>
				</form>
			</section>
		</>
	);
};

export default Job;
