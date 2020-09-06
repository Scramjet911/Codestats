import Head from "next/head";
import Link from "next/link";
import Top from "../../components/top";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";

function Settings(props) {
  const { register, watch } = useForm();
  const seljobstud = watch("jobstud", props.jobstud);
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
                <a className="nav-link active h5" href="#">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <Link href="/profile/securitys">
                  <a className="nav-link text-primary h5" href="#">
                    Security
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-7 ml-2">
            <img
              src="/images/loginImg.JPG"
              className="img-thumb mb-3"
              alt="..."
            />
            <button type="button" class="btn btn-primary btn-sm mt-4" href="#">
              Change
            </button>
            <br />
            <div className="mt-5">
              <form>
                <div className="form-group">
                  <h5>Username</h5>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="username"
                      name="username"
                      maxlength="14"
                      ref={register}
                    />
                  </div>
                </div>
                <hr />
                <p className="h2">ABOUT</p>
                <label for="jobstud" className="col-form-label">
                  <h5>Student/Working</h5>
                </label>
                <br />
                <br />
                <select className="form-control" name="jobstud" ref={register}>
                  <option value="0">Student</option>
                  <option value="1">Working</option>
                </select>
                <br />
                {seljobstud == 0 && (
                  <div>
                    <div className="form-group">
                      <label for="occupation" className="col-form-label">
                        <h5> Ongoing degree</h5>
                      </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="occupation"
                        placeholder="Ongoing degree/Class"
                        ref={register}
                      />
                    </div>
                    <hr />
                    <div className="form-group">
                      <label for="institution" className="col-form-label">
                        <h5>Institution</h5>
                      </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        placeholder="Enter your institution"
                        ref={register}
                      />
                    </div>
                  </div>
                )}
                {seljobstud == 1 && (
                  <div>
                    <div className="form-group">
                      <label for="occupation" className="col-form-label">
                        <h5> Occupation</h5>
                      </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="occupation"
                        placeholder="Enter your occupation"
                        ref={register}
                      />
                    </div>
                    <hr />
                    <div className="form-group">
                      <label for="organisation" className="col-form-label">
                        <h5>Organisation</h5>
                      </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        placeholder="Enter your organisation"
                        ref={register}
                      />
                    </div>
                  </div>
                )}
                <hr />
                <div class="form-group">
                  <label for="dob" className="col-form-label">
                    <h5> Date of Birth</h5>
                  </label>
                  <br />
                  <br />
                  <input className="form-control" type="date" id="DOB" />
                </div>
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
    </div>
  );
}

export default Settings;