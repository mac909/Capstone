import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};

	return (
		<>
			<header className="header">
				<div className="logo">
					<Link to="/">OrderSetter</Link>
				</div>
				<ul className="links">
					{user ? (
						<>
							<li>
								<button className="btn" onClick={onLogout}>
									<FaSignOutAlt /> Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/login">
									<FaSignInAlt /> Login
								</Link>
							</li>
							<li>
								<Link to="/register">
									<FaUser /> Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</header>
		</>
	);
};

export default Header;
