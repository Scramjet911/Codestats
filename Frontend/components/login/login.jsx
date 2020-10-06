import React from "react";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import {hideLogin} from '../Top/navbar'
import style from "./login.module.css"

import { login, authenticate, isAuthenticated } from "../auth/index";

function Login(props) {
	const router = useRouter();

	const routeChange = () => {
		let path = "/SignUp";
		props.history.push(path);
	};

	const handleShow = () => {
		setvalues({
			...values,
			isActive: true,
		});
	};

	const handleHide = () => {
		setvalues({
			...values,
			isActive: false,
		});
	};

	const [values, setvalues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false,
		isActive: true,
	});
	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();
	const handleChange = (name) => (event) => {
		setvalues({ ...values, error: false, [name]: event.target.value });
	};
	const succesmessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading..</h2>
				</div>
			)
		);
	};
	const errormessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};
	const performRedirect = () => {
		//TODO: do aredirection

		if (didRedirect) {
			if (user && user.role === 1) {
				console.log("redirected to admin");
				hideLogin();
				return <p>redirected to admin</p>;
			} else {
				console.log("redirected to user");
				hideLogin();
				return <p>redirected to user</p>;
			}
		}
		if (isAuthenticated()) {
			console.log("is authenticate is working");
			let path = "/";
			return router.push(path);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setvalues({ ...values, error: false, loading: true });
		login({ email, password })
		.then((data) => {
			if (data.error) {
				console.log(data);
				setvalues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					console.log(data);
					setvalues({
						...values,
						didRedirect: true,
						// email:"",
						// password:"",
						// error:"",
						// success:true
					});
				});
				performRedirect();
			}
		})
		.catch((e) => {
			console.log("Error", e);
		});
	};

	return (
		<>
			<div className={style["auth-wrapper"]} ref={props.containerRef}>
				{succesmessage()}
				{errormessage()}
				<div className={style["auth-inner"]}>
					{values.isActive ? (
						<div>
							<form onSubmit={onSubmit}>
								{/* <h3 className="title">Log In</h3> */}
								<div className="form-group"></div>
								<div className="login-input-pos">
									<div className="form-group">
										<label className="form-label">Email address</label>
										<input
											type="email"
											value={email}
											onChange={handleChange("email")}
											className="form-control"
											required="required"
											placeholder="Enter email"
										/>
										<label className="form-label">Password</label>
										<input
											type="password"
											value={password}
											onChange={handleChange("password")}
											className="form-control"
											required="required"
											placeholder="Enter password"
										/>
									</div>
									<div className="custom-control custom-checkbox">
										<input
											type="checkbox"
											className="custom-control-input"
											id="customCheck1"
										/>
										<label
											className="custom-control-label"
											htmlFor="customCheck1"
										>
											Remember me
                    					</label>
									</div>
									<div className="form-group forgot-password text-right login-pos">
										<button
											type="submit"
											className="btn btn-primary btn-block"
										>
											Log In
                    					</button>
										<button className=" btn btn-link " onClick={handleHide}>
											Forgot password?
                    					</button>
									</div>
								</div>
							</form>
						</div>
					) : (
						<form>
							<div className="form-group"></div>
							<div className="login-input-pos">
								<div className="form-group">
									<label className="form-label">Email address</label>
									<input
										type="email"
										className="form-control"
										placeholder="Enter email"
									/>
								</div>
								<div className="form-group forgot-password ">
									<button type="submit" className="btn btn-primary btn-block">
										Send reset link
									</button>
								</div>
							</div>
						</form>
					)}
				</div>
			</div>
		</>
	);
}
export default Login;
