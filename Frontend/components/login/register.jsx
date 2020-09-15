import React, {createRef} from "react";

const signupurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/signup/":"http://localhost:8000/api/signup/";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.email = createRef();
        this.username = createRef();
        this.password = createRef();
        this.confpass = createRef();
        this.name = createRef();
    }

    state={
        errormsg:""
    }

    signup = (event)=>{
        event.preventDefault();
        if(this.password.current.value !== this.confpass.current.value){
            this.setState({errormsg:"Passwords Do Not Match"});
            return;
        }
        else{
            let dets = JSON.stringify({
                username: this.username.current.value,
                name: this.name.current.value,
                email: this.email.current.value,
                password: this.password.current.value
            });
            console.log(dets);
            fetch(signupurl,{
                method:'POST',
                headers:{
                    'Content-type':'application/json;charset=utf-8'
                },
                body:dets
            })
            .then(response=>{
                if(response.status === 200){
                    this.setState({errormsg:"A Verification Mail has been sent to Your Email."})
                    console.log("Verification mail sent");
                }
                else{
                    this.setState({errormsg:"Could Not Sign You Up, Please Try Again Later."})
                    console.log("verification mail not sent");
                }
            })
            .catch(err=>console.log(err));
        }
    }

    alertMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: (this.state.errormsg==="") ? "none" : "" }}
					>
						{this.state.errormsg}
					</div>
				</div>
			</div>
		);
	};

    render() {
        return (
            <div className="auth-wrapper" ref={this.props.containerRef}>
                {this.alertMessage()}
                <div className="auth-inner">
                    <form onSubmit={this.signup}>
                        <h3 className="title">Sign Up</h3>

                        <label className="form-label"> Name</label>
                        <input
                            type="text"
                            ref={this.name}
                            className="form-control"
                            placeholder="Name"
                            required
                        />
                        <label className="form-label">E-mail Id</label>
                        <input
                            type="email"
                            ref={this.email}
                            className="form-control"
                            placeholder="E-mail Id"
                            required
                        />
                        <label className="form-label">User Name</label>
                        <input
                            type="text"
                            ref={this.username}
                            className="form-control"
                            placeholder="User Name"
                            required
                        />
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            ref={this.password}
                            className="form-control"
                            placeholder="Enter password"
                            minLength="8"
                            required
                        />
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            ref={this.confpass}
                            className="form-control"
                            placeholder="Enter password"
                            required
                        />
                        <label className="title"></label>
                        <div className="form-group forgot-password text-right login-pos">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
