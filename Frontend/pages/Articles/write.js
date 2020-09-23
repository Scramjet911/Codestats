import Head from "next/head";
import Layout from "../../components/layout";
import dynamic from 'next/dynamic'
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});;
import styles from "./article.module.css";
import LikeButton from "../../components/like";
import Write from "../../components/Write"
const creatediscurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/article/create/":"http://localhost:8000/api/article/create/";


export default function WriteArticle() {
    return (
        <Layout>
            <Head>
                <title>Write article</title>
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
            <div id="row">
                <div className={styles.article_body}>
                    <div className={styles.title}>
                        <div className="title">Write an article</div>
                    </div>
                        <Write url={creatediscurl} name="Article" nextPage="/Articles/Articles"/>
                </div>
            </div>
        </Layout>
    );
}
