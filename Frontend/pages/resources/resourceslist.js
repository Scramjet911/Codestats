import Head from "next/head";
import Link from "next/link";
import dynamic from 'next/dynamic';
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});
import Resourceitem from "../../components/resources/resourceitem.js";
import Categorysidecard from "../../components/resources/categorysidecard.js";

function Resourceslist() {
    return (
        <div>
            <Head>
                <title>Discuss</title>
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
            <div>
                <Navbar />
            </div>
            <div>
                <h1 className="title-resource ">Resources on React</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <Resourceitem
                            content={"CSS Basics: Styling Links Like a Boss"}
                            goto="#"
                        />
                        <Resourceitem
                            content={
                                "Build encapsulated components that manage their own state, then compose them to make complex UIs."
                            }
                            goto="https://www.google.com"
                        />
                        <Resourceitem
                            content={
                                "Stretched link Make any HTML element or Bootstrap component clickable by stretching a nested link via"
                            }
                            goto="#"
                        />
                        <Resourceitem
                            content={"50 INSPIRATIONAL WEBSITE INTRODUCTIONS"}
                            goto="#"
                        />
                    </div>
                    <div className="col-3">
                        <h1 style={{ margin: "50px" }} className="h5">
                            More Categories
                        </h1>
                        <Categorysidecard content={"Bootstrap"} goto="#" />
                        <Categorysidecard content={"Next JS"} goto="#" />
                        <Categorysidecard content={"Postman"} goto="#" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Resourceslist;
