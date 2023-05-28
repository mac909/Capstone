import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderForm from "../../components/orderForm/OrderForm";
import Spinner from "../../components/spinner/Spinner";
import { getOrders, reset } from "../../features/orders/orderSlice";

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const { orders, isError, isLoading, message } = useSelector(
		(state) => state.orders
	);

	useEffect(() => {
		dispatch(getOrders("open"));

		if (!user) {
			navigate("/login");
		}
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Open Orders</p>
			</section>

			<OrderForm />
		</>
	);
};

export default Dashboard;
