import Head from "next/head";
import Layout from "../../components/layout";
import dynamic from "next/dynamic";
const Navbar = dynamic(import("../../components/Top/navbar"), { ssr: false });
import Write from "../../components/Write";
import styles from "./discuss.module.css";
import LikeButton from "../../components/like";

const creatediscurl =
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api/discussion/"
        : "http://localhost:8000/api/discussion/";

export default function CreateDisc() {
    return (
        <Layout>
            <Head>
                <title>Display</title>
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
            <div id="row">
                <div className={styles.discussion_body}>
                    <div className={styles.title}>
                        <div className="title">Ask a question?</div>
                    </div>
                    <Write
                        url={creatediscurl}
                        name="Discussion"
                        nextPage="/discussion/top"
                    />
                </div>
            </div>
        </Layout>
    );
}
