import React from "react";
import { Register } from "./register.jsx";
import Link from 'next/link'
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
 routeChange(){
   let path="/SignUp";
   this.props.history.push(path);
 }
 
  state = {
    isActive: true,
  };
 
  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };
 
  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };
  render() {
    return (
      <div className="auth-wrapper" ref={this.props.containerRef}>
          <div className="auth-inner">
        {this.state.isActive ? ( <form>
                   <h3 className="title">Log In</h3>
                   <div className="form-group">
                   </div>
                   <div className="login-input-pos">
                   <div className="form-group">
                     <label className="form-label">Email address</label>
                     <input type="email" className="form-control" required="required" placeholder="Enter email" />
                     <label className="form-label">Password</label>
                     <input type="password"  className="form-control" required="required" placeholder="Enter password" />
                   </div>
                   <div className="custom-control custom-checkbox">
                     <input type="checkbox" className="custom-control-input" id="customCheck1" />
                     <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                   </div>
                   <div className="form-group forgot-password text-right login-pos">
                     <button type="submit"  className="btn btn-primary btn-block">Log In</button>
                     <button className=" btn btn-link " onClick={this.handleHide}>Forgot password?</button>
                   </div>
                   </div>
                   </form>
         
        ) : ( <form>
            <div className="form-group">
            </div>
            <div className="login-input-pos">
             <div className="form-group">
               <label className="form-label">Email address</label>
               <input type="email" className="form-control" placeholder="Enter email" />
             </div>
             <div className="form-group forgot-password ">
               <button type="submit" className="btn btn-primary btn-block">Send reset link</button>
             </div>
            </div>
            </form>
           
        )}
        </div>
      </div>
    );
  }
}
 