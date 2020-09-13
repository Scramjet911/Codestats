import Head from "next/head";
import Link from "next/link";
import Top from "../../components/top";

function Adminpanel() {
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
                <Top />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3 mt-5">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <a className="nav-link active h5" href="#">
                                    Review Events
                                </a>
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
                                <Link href="/admin/manresources">
                                    <a
                                        className="nav-link text-primary h5"
                                        href="#"
                                    >
                                        Resources
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-9 mt-5 ">
                        <h1 className="display-4">Events List</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-7 ">
                                    <h1 className="h4">TITLE</h1>
                                </div>
                                <div className="col-3">
                                    <p className="h4">DURATION</p>
                                </div>
                                <div className="col-2"></div>
                            </div>
                            <hr className="hr-original" />

                            <div className="row">
                                <div className="col-7">
                                    <h3>GEC Summer of Code</h3>
                                    <p>
                                        <a>www.hackerrank.com/asasasaasa</a>
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p>DD-MM-YY HH:MM To</p>
                                    <p>DD-MM-YY HH:MM</p>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn-sm btn-outline-light "
                                        href="#"
                                        role="button"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn-sm btn-outline-danger "
                                        href="#"
                                        role="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-7">
                                    <h3>Code wars NITC</h3>
                                    <p>
                                        <a>www.codechef.com/asasasaasa</a>
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p>08-07-20 09:00 To</p>
                                    <p>12-07-20 09:00</p>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn-sm btn-outline-light "
                                        href="#"
                                        role="button"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn-sm btn-outline-danger "
                                        href="#"
                                        role="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-7">
                                    <h3>ICPC Practice event</h3>
                                    <p>
                                        <a>www.hackerearth.com/lalalala</a>
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p>DD-MM-YY HH:MM To</p>
                                    <p>DD-MM-YY HH:MM</p>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn-sm btn-outline-light "
                                        href="#"
                                        role="button"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn-sm btn-outline-danger "
                                        href="#"
                                        role="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Adminpanel;
