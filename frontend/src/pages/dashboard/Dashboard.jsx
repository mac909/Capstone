import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderForm from "../../components/orderForm/OrderForm";
import Spinner from "../../components/spinner/Spinner";
import { getOrders, reset } from "../../features/orders/orderSlice";
import OrderItem from "../../components/orderItem/OrderItem";
import JobItem from "../../components/jobItem/JobItem";
import { getJobs, resetJob } from "../../features/jobs/jobSlice";

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formatCurrency = (amt) => {
		return amt.toLocaleString(undefined, {
			style: "currency",
			currency: "USD",
		});
	};

	const { user } = useSelector((state) => state.auth);

	const { orders, isError, isLoading, message } = useSelector(
		(state) => state.orders
	);

	const { jobs } = useSelector((state) => state.jobs);

	useEffect(() => {
		dispatch(getOrders());
		dispatch(getJobs());

		if (!user) {
			navigate("/login");
		}
		return () => {
			dispatch(reset());
		};
	}, [navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Your Todo List</p>
			</section>

			<OrderForm />
			<section className="content">
				{orders.length > 0 ? (
					<div className="goals">
						{orders.map((order) => (
							<OrderItem key={order._id} order={order} />
						))}
					</div>
				) : (
					<h3>No tasks</h3>
				)}
			</section>
			<section>
				<h1>Jobs</h1>
				{jobs.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-black text-white">
									<th className="px-4 py-2">Customer</th>
									<th className="px-4 py-2">Description</th>
									<th className="px-4 py-2">PO Number</th>
									<th className="px-4 py-2">PO Date</th>
									<th className="px-4 py-2">Due Date</th>
									<th className="px-4 py-2">Quantity</th>
									<th className="px-4 py-2">Price/Unit</th>
									<th className="px-4 py-2">Total</th>
									<th className="px-4 py-2">Status</th>
								</tr>
							</thead>
							<tbody>
								{jobs.map((job, index) => (
									<tr
										className={`${
											index % 2 === 0
												? "bg-gray-100"
												: "bg-white"
										}`}
										key={job._id}
									>
										<td className="px-4 py-2">
											{job.customer}
										</td>
										<td className="px-4 py-2">
											{job.description}
										</td>
										<td className="px-4 py-2">
											{job.poNumber}
										</td>
										<td className="px-4 py-2">
											{job.poDate}
										</td>
										<td className="px-4 py-2">
											{job.dueDate}
										</td>
										<td className="px-4 py-2">
											{job.quantity}
										</td>
										<td className="px-4 py-2">
											{formatCurrency(job.price)}
										</td>
										<td className="px-4 py-2">
											{formatCurrency(
												job.quantity * job.price
											)}
										</td>
										<td className="px-4 py-2">
											{job.status}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<h3>No jobs</h3>
				)}
			</section>
		</>
	);
};

export default Dashboard;
