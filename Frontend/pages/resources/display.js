import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import dynamic from 'next/dynamic'
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});;
import styles from "./resource.module.css";
export default function Display() {
    return (
        <div>
            <Head>
                <title>resources</title>
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
                    crossOrigin="anonymous"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            <Navbar />
            <div>
                <h2 className={styles.page_title}>Resources</h2>
            </div>
            <div>
                <div className="search">
                    <input type="text" placeholder="Search by category" />
                </div>
                <div className="search-category">
                    <button type="submit" className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="column">
                        <div className={styles.resource_cards}>
                            <div id="center" className={styles.icon}>
                                <div className="avatar">
                                    <img
                                        src="/images/react.png"
                                        className="image-size1"
                                    />
                                </div>
                            </div>
                            <div className={styles.category}>
                                <h2>React</h2>
                            </div>
                            <div className={styles.count}>
                                <h1>10</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
