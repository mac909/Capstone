import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob, updateJob } from "../../features/jobs/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";

const EditJob = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const allOptions = ["Saw", "Laser", "Bend", "Machine", "Weld", "Pack"];

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

	const {
		customer,
		description,
		dueDate,
		poNumber,
		quantity,
		price,
		operations,
		status,
		notes,
	} = formData;

	const [job, setJob] = useState(null); // Set initial job state as null

	useEffect(() => {
		const fetchJob = async () => {
			try {
				const fetchedJob = await dispatch(getJob(id));
				const {
					customer,
					description,
					dueDate,
					poNumber,
					quantity,
					price,
					operations,
					status,
					notes,
				} = fetchedJob.payload;
				setJob(fetchedJob.payload);
				setFormData((prevFormData) => ({
					...prevFormData,
					customer,
					description,
					dueDate,
					poNumber,
					quantity,
					price,
					operations,
					status,
					notes,
				}));
			} catch (error) {
				console.log(error);
			}
		};

		fetchJob();
	}, [dispatch, id]);

	const [selectedOptions, setSelectedOptions] = useState([]);

	// Function to handle checkbox selection
	const handleCheckboxChange = (option) => {
		setSelectedOptions((prevOptions) => {
			if (prevOptions.includes(option)) {
				// Remove the option from the selectedOptions array
				return prevOptions.filter((item) => item !== option);
			} else {
				// Add the option to the selectedOptions array
				return [...prevOptions, option];
			}
		});

		setFormData((prevFormData) => {
			const { operations } = prevFormData;
			const updatedOperations = selectedOptions.includes(option)
				? operations.filter((item) => item.operation !== option)
				: [...operations, { operation: option, status: "Open" }];

			return { ...prevFormData, operations: updatedOperations };
		});
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "quantity" || name === "price") {
			if (!isNaN(value)) {
				setFormData((prevFormData) => ({
					...prevFormData,
					[name]: Number(value),
				}));
			}
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateJob({ id: id, formData }));
			toast.success("Job updated successfully");
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
							value={customer} // Set initial value from job data
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
							value={description} // Set initial value from job data
							onChange={onChange}
							placeholder="Description"
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
							value={poNumber} // Set initial value from job data
							onChange={onChange}
							placeholder="PO Number"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="dueDate">Due Date</label>
						<input
							type="text"
							id="dueDate"
							name="dueDate"
							value={dueDate} // Set initial value from job data
							onChange={onChange}
							placeholder="Due Date"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="quantity">Quantity</label>
						<input
							type="text"
							id="quantity"
							name="quantity"
							value={quantity} // Set initial value from job data
							onChange={onChange}
							placeholder="Quantity"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="price">Price Per Unit</label>
						<input
							type="text"
							id="price"
							name="price"
							value={price} // Set initial value from job data
							onChange={onChange}
							placeholder="Price Per Unit"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div>
						<label htmlFor="total">Total</label>
						<input
							type="text"
							id="total"
							name="total"
							value={null || price * quantity} // Set initial value from job data
							onChange={onChange}
							placeholder="Total"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						{/* Checkbox options */}
						{allOptions.map((option) => (
							<label key={option} className="flex items-center">
								<input
									type="checkbox"
									className="mr-2"
									checked={operations.some(
										(op) => op.operation === option
									)}
									onChange={() =>
										handleCheckboxChange(option)
									}
								/>
								{option}
							</label>
						))}
					</div>
					<div>
						<label htmlFor="status">Status</label>
						<input
							type="text"
							id="status"
							name="status"
							value={status} // Set initial value from job data
							onChange={onChange}
							placeholder="Status"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						<label htmlFor="notes">Notes</label>
						<textarea
							id="notes"
							name="notes"
							value={notes} // Set initial value from job data
							onChange={onChange}
							placeholder="Notes"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div className="col-span-2">
						<input
							type="submit"
							value="Save Changes"
							className="w-full px-4 py-2 bg-black text-white rounded-md cursor-pointer"
						/>
					</div>
				</form>
			</section>
		</>
	);
};

export default EditJob;
