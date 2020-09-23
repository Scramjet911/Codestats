import Head from "next/head";
import Link from "next/link";

import dynamic from "next/dynamic";
import { Component, createRef } from "react";
const Navbar = dynamic(import("../../components/Top/navbar"), { ssr: false });

const resourceurl =
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api/resource/"
        : "http://localhost:8000/api/resource/";

class Manresources extends Component {
    constructor(props) {
        super(props);
        this.description = createRef();
        this.link = createRef();
        this.category = createRef();
    }
    addResource = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("jwt");
        if (token) {
            token = JSON.parse(token);
            fetch(resourceurl + `${token.user._id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    description: this.description.current.value,
                    link: this.link.current.value,
                    category: [this.category.current.value],
                }),
            })
                .then((data) => {
                    if (data.status === 200) {
                        this.description.current.value = this.link.current.value = this.category.current.value =
                            "";
                    } else {
                        console.log("Couldn't Save Resource.");
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    render() {
        return (
            <div>
                <Head>
                    <title>Admin Panel</title>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossOrigin="anonymous"
                    />
                </Head>
                <div>
                    <Navbar />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 mt-5">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <Link href="/admin/adminpanel">
                                        <a
                                            className="nav-link text-primary h5"
                                            href="#"
                                        >
                                            Review Events
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/admin/addevent">
                                        <a
                                            className="nav-link text-primary h5"
                                            href="#"
                                        >
                                            Add Event
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active  h5" href="#">
                                        Resources
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-9 mt-5">
                            <h1 className="text-discuss">Add New Resource</h1>
                            <form onSubmit={this.addResource}>
                                <input
                                    type="text"
                                    ref={this.link}
                                    className="form-contol mr-3"
                                    placeholder="Link to Resource"
                                ></input>
                                <input
                                    type="text"
                                    ref={this.description}
                                    className="form-contol mr-3"
                                    placeholder="Description of Resource"
                                ></input>
                                <input
                                    type="text"
                                    ref={this.category}
                                    className="form-contol mr-3"
                                    placeholder="Categories of Resource"
                                ></input>
                                <button
                                    type="submit"
                                    className="btn btn-outline-light  my-4"
                                >
                                    ADD
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Manresources;
