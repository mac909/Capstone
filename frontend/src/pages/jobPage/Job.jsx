import React from "react";
import { useDispatch } from "react-redux";
import { createJob, createOperation } from "../../features/jobs/jobSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Job = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
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

	const { customer, description, dueDate, poNumber, quantity, price } =
		formData;

	const [selectedOptions, setSelectedOptions] = useState([]);

	// Function to handle checkbox selection
	const handleCheckboxChange = (option) => {
		setSelectedOptions((prevOptions) => {
			if (prevOptions.includes(option)) {
				return prevOptions.filter((item) => item !== option);
			} else {
				return [...prevOptions, option];
			}
		});

		setFormData((prevFormData) => ({
			...prevFormData,
			operations: selectedOptions.includes(option)
				? prevFormData.operations.filter((item) => item !== option)
				: [...prevFormData.operations, option],
		}));
	};

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
			dispatch(createOperation(formData.operations));
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
						<label htmlFor="price">Price Per Unit</label>
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
					<div>
						<label htmlFor="total">Total</label>
						<input
							type="number"
							id="total"
							name="total"
							placeholder="Price Per Unit"
							value={price * quantity}
							readOnly
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						{/* Checkbox options */}
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Saw")}
								onChange={() => handleCheckboxChange("Saw")}
							/>
							Saw
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Laser")}
								onChange={() => handleCheckboxChange("Laser")}
							/>
							Laser
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Bend")}
								onChange={() => handleCheckboxChange("Bend")}
							/>
							Bend
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Machine")}
								onChange={() => handleCheckboxChange("Machine")}
							/>
							Machine
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Weld")}
								onChange={() => handleCheckboxChange("Weld")}
							/>
							Weld
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedOptions.includes("Pack")}
								onChange={() => handleCheckboxChange("Pack")}
							/>
							Pack
						</label>
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
