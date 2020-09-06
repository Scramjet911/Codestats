import Head from "next/head";
import React from "react";
import Top from "../../components/top.js";
import Link from "next/link";
import { useForm } from "react-hook-form";

function Securitys() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Head>
        <title>Settings</title>
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </Head>
      <div className="container">
        <Top />
      </div>
      <div className="container mnav">
        <div className="row">
          <div className="col-2 mset">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <Link href="/profile/settings">
                  <a className="nav-link text-primary h5 " href="#">
                    Account
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active h5" href="#">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div className="col-7 ml-2">
            <p className="h3">Change Password</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label for="crpassw" className="col-form-label">
                  Current password
                </label>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control ml-4"
                  name="crpassw"
                  placeholder="Enter current password"
                  ref={register({ required: true })}
                />
                {errors.crpassw && (
                  <span>
                    <p className="text-danger ml-4 font-weight-light">
                      This field is required
                    </p>
                  </span>
                )}
              </div>
              <div className="form-group">
                <label for="npassw" className="col-form-label">
                  Enter new password
                </label>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control ml-4"
                  name="npassw"
                  ref={register({ required: true })}
                  minlength="8"
                  maxlength="20"
                  placeholder="Try to include numbers,special characters"
                />
                <small id="passwordHelpBlock" className="form-text ml-4">
                  Your password must be 8-20 characters, not containing any
                  spaces.
                </small>
                {errors.npassw && (
                  <span>
                    <p className="text-danger ml-4 font-weight-light">
                      This field is required
                    </p>
                  </span>
                )}
              </div>
              <div className="form-group">
                <label for="cnewpassw" className="col-form-label">
                  Confirm new password
                </label>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control ml-4"
                  name="cnewpassw"
                  placeholder="Re-enter new password"
                  ref={register({
                    validate: (value) => value === watch("npassw"),
                  })}
                />
                {errors.cnewpassw && (
                  <span>
                    <p className="text-danger ml-4 font-weight-light">
                      Passwords do not match!
                    </p>
                  </span>
                )}
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-success float-right mb-3"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Securitys;