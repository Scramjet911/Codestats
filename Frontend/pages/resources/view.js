import Head from "next/head";
import dynamic from "next/dynamic";
const Navbar = dynamic(import("../../components/Top/navbar"), { ssr: false });
import Resourceitem from "../../components/resources/resourceitem.js";
import Categorysidecard from "../../components/resources/categorysidecard.js";
import { Component } from "react";
import {withRouter} from "next/router";
import style from "./resource.module.scss";

const resourceurl =
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api/resource/"
        : "http://localhost:8000/api/resource/";

class Resourceslist extends Component {
    state = {
        title : "",
        resourcelist: [],
        loaded: false,
    };
    componentDidMount() {
        let [,...params] = this.props.router.asPath.split('?');
        params = params.join("&");
        let resname = new URLSearchParams(params);
        let category = resname.get('cat');
        this.setState({title:category.charAt(0).toUpperCase() + category.slice(1)});
        // resname = resname[resname.length-1]
        // console.log(this.props.router, resname.get("cat"), params);
        fetch(resourceurl + category, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((data) => {
                if (data.status == 400) {
                    console.log("Server Error");
                } else {
                    data.json().then((cats) => {
                        this.setState({ resourcelist: cats });
                        this.setState({ loaded: true });
                        // console.log(cats);
                    });
                }
            })
            .catch((err) => console.log("Error", err));
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Discuss</title>
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
                    <h1 className={style["title-resource"]}>{this.state.title}</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            {this.state.loaded &&
                                this.state.resourcelist.map((res, index) => {
                                    return (
                                        <Resourceitem
                                            key={index}
                                            content={res.description}
                                            goto={res.link}
                                        />
                                    );
                                })}
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
}
export default withRouter(Resourceslist);
