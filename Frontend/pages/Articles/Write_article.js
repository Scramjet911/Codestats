import Head from "next/head";
import Layout from "../../components/layout";
import Navbar from "../../components/Top/navbar";
import Write from "../../components/Write";
import styles from "./article.module.css";
import LikeButton from "../../components/like";
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
                    <div className={styles.question}>
                        <label> Title : </label>
                        <div>
                            <input type="text" className={styles.input} />
                        </div>
                        <br />
                        <label> Tags : </label>
                        <div>
                            <input type="text" className={styles.input} />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.editor}>
                            <Write />
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <button type="submit" className="btn btn-success mb-3">
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
