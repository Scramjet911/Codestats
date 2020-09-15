import Head from "next/head";
import Link from "next/link";
import dynamic from 'next/dynamic';
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});;
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./users.module.css";

function Settings(props) {
    const { register, watch } = useForm();
    const seljobstud = watch("jobstud", props.jobstud);
    const [selectedFile, setSelectedFile] = useState(null);
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
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
            </Head>
            <Navbar />
            <div className="container mnav">
                <div className="row">
                    <div className="col-2 mset">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <a
                                    className="nav-link active h5"
                                    href="#"
                                    style={{ textAlign: "center" }}
                                >
                                    Account
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link href="/users/securitys">
                                    <a
                                        className="nav-link text-primary h5"
                                        href="#"
                                    >
                                        Security
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        <div className="vl1" />
                    </div>
                    <div className="col-7 ml-2">
                        <div
                            className={styles.avatar}
                            style={{
                                top: "20px",
                                left: "0px",
                                width: "200px",
                                height: "200px",
                                borderRadius: "100px",
                            }}
                        >
                            <button className={styles.img001}>
                                <img
                                    src="/images/avatar.png"
                                    className={styles.image_size4}
                                    title="change profile photo"
                                />
                            </button>
                        </div>
                        <div class={styles.image_upload}>
                            <label for="file-input">
                                <i class="fas fa-camera" aria-hidden="true"></i>
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={() =>
                                    setSelectedFile(event.target.files[0])
                                }
                            />
                        </div>
                        <br />
                        <div className="mt-5">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">
                                        Username
                                    </label>
                                    <br />
                                    <br />
                                    <div
                                        className="input-group mb-3"
                                        style={{ width: "400px" }}
                                    >
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"
                                                id="basic-addon1"
                                            >
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
                                            style={{
                                                left: "0px",
                                                width: "50px",
                                            }}
                                        />
                                    </div>
                                </div>
                                <p style={{ color: "rgb(15, 153, 158)" }}>
                                    ABOUT
                                </p>
                                <label for="jobstud" className="col-form-label">
                                    Student/Working
                                </label>
                                <br />
                                <br />
                                <select
                                    style={{ left: "0px" }}
                                    className="form-control"
                                    name="jobstud"
                                    ref={register}
                                >
                                    <option value="0">Student</option>
                                    <option value="1">Working</option>
                                </select>
                                <br />
                                {seljobstud == 0 && (
                                    <div>
                                        <div className="form-group">
                                            <label
                                                for="occupation"
                                                className="col-form-label"
                                            >
                                                Ongoing degree
                                            </label>
                                            <br />
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="occupation"
                                                placeholder="Ongoing degree/Class"
                                                ref={register}
                                                style={{ left: "0px" }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                for="institution"
                                                className="col-form-label"
                                            >
                                                Institution
                                            </label>
                                            <br />
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="institution"
                                                placeholder="Enter your institution"
                                                ref={register}
                                                style={{ left: "0px" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {seljobstud == 1 && (
                                    <div>
                                        <div className="form-group">
                                            <label
                                                for="occupation"
                                                className="col-form-label"
                                            >
                                                Occupation
                                            </label>
                                            <br />
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="occupation"
                                                placeholder="Enter your occupation"
                                                ref={register}
                                                style={{ left: "0px" }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                for="organisation"
                                                className="col-form-label"
                                            >
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
                                                style={{ left: "0px" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div class="form-group">
                                    <label for="dob" className="col-form-label">
                                        Date of Birth
                                    </label>
                                    <br />
                                    <br />
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="DOB"
                                        style={{ left: "0px" }}
                                    />
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
