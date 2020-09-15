import Head from "next/head";
import Link from "next/link";

import dynamic from 'next/dynamic';
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});


function Manresources() {
    return (
        <div>
            <Head>
                <title>Admin Panel</title>
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
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
                        <h1 className="text-discuss">ADD CATEGORY</h1>
                        <form>
                            <input
                                type="text"
                                name="category"
                                className="form-contol mr-3"
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
export default Manresources;
