import Head from "next/head";
import Layout from "../../components/layout";
import Navbar from "../../components/Top/navbar";
import Write from "../../components/Write";
import styles from "./article.module.css";
import LikeButton from "../../components/like";
export default function ViewArticle() {
    return (
        <div>
            <Head>
                <title>View article</title>
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
                    <div className={styles.date}>dd/mm/yyyy</div>
                    <div className={styles.bookmark}>
                        <button>
                            {" "}
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                    <div className="title">Article title</div>
                    <div className={styles.avatar}>
                        <img src="/images/avatar.png" className="image-size1" />
                    </div>
                    <div className={styles.details2}>
                        <div className={styles.username}>@username</div>
                        <div className={styles.category}>category:</div>
                    </div>
                    <div className={styles.article_content}>content:</div>
                    <div className={styles.hl} />
                    <div className="row">
                        <div className={styles.reaction}>
                            <div className={styles.like}>
                                <LikeButton />
                            </div>
                            <div className={styles.comment}>
                                <i class="far fa-comment"></i> 0
                            </div>
                        </div>
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
