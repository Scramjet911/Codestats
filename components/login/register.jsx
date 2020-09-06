import React from "react";
import { Login } from "./login.jsx";
import Link from 'next/link'
export class Register extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (  <div className="auth-wrapper" ref={this.props.containerRef}>
              <div className="auth-inner">
              <form>
              <h3 className="title">Sign Up</h3>
               
                  <label className="form-label"> Name</label>
                  <input type="name" className="form-control" placeholder="Name" />
                  <label className="form-label">E-mail Id</label>
                  <input type="email" className="form-control" placeholder="E-mail Id" />
                  <label className="form-label">User Name</label>
                  <input type="usre_name" className="form-control" placeholder="User Name" />
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" />
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" />
                  <label className="title"></label>
                  <div className="form-group forgot-password text-right login-pos">
                     <button type="submit"  className="btn btn-primary btn-block">Sign Up</button>
                  </div>
          </form>
          </div>
          </div>
    );
  }
}
 