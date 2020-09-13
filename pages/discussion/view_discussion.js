import Head from "next/head";
import Layout from "../../components/layout";
import Navbar from "../../components/Top/navbar";
import Write from "../../components/Write";
import styles from "./discuss.module.css";
import LikeButton from "../../components/like";
export default function viewDiscussion() {
    return (
        <div>
            <Head>
                <title>Discussion</title>
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

            <div id="row">
                <div className={styles.discussion_body}>
                    <div className={styles.date}>dd/mm/yyyy</div>
                    <div className="title">Problem title</div>
                    <div className={styles.details}>
                        <div className={styles.username}>@username</div>
                        <div className={styles.category}>category:</div>
                    </div>
                    <div className={styles.content}>Problem discussion :</div>
                    <div className={styles.hl} />

                    <div className={styles.comment}>
                        <i class="far fa-comment"></i> 0
                    </div>
                    <div className={styles.conversation}>
                        <textarea
                            className={styles.control}
                            placeholder="Comment here....."
                        />
                        Comment List:
                        <div id="row">
                            <div className={styles.username}>@username1</div>
                            <div className={styles.reply}>
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                vkhkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                            </div>
                        </div>
                        <div id="row">
                            <div className={styles.username}>@username2</div>
                            <div className={styles.reply}>
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                vkhkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                            </div>
                        </div>
                        <div id="row">
                            <div className={styles.username}>@username3</div>
                            <div className={styles.reply}>
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                vkhkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                                khkjhkljlk;lkfdgfklkjhlkgfjhgjhkljl
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
