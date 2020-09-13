import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import Navbar from "../../components/Top/navbar";
import styles from "./article.module.css";
export default function Articles() {
    return (
        <div>
            <Head>
                <title>Articles</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                    integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                    crossOrigin="anonymous"
                />
            </Head>
            <Navbar />
            <div id="center">
                <h2 className={styles.page_title}>Articles</h2>
            </div>
            <div id="center">
                <div className="search">
                    <input type="text" placeholder="Search by category" />
                </div>
                <div className="search-category">
                    <button type="submit" className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.article_category}>Category1</div>
                </div>
                <div>
                    <div className="row">
                        <div id="center" className={styles.article_list}>
                            <div className={styles.date}>dd/mm/yyyy</div>
                            <div className={styles.bookmark}>
                                <button>
                                    <i className="fas fa-bookmark"></i>
                                </button>
                            </div>
                            <div className="title">Article title</div>
                            <div className={styles.avatar}>
                                <img
                                    src="/images/avatar.png"
                                    className="image-size1"
                                />
                            </div>
                            <div className={styles.details2}>
                                <div className={styles.username}>@username</div>
                                <div className={styles.category}>category:</div>
                            </div>
                            <div className={styles.article_content}>
                                content: dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh dbfbd
                                fjndf,mnabmnbfdm,fnas,vmnsbfamsb fjgkjhkldhdgf
                                fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                <h2>
                                    <a>Read more.....</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={styles.article_category}>Category2</div>
                    </div>
                    <div className="row">
                        <div id="center" className={styles.article_list}>
                            <div className={styles.date}>dd/mm/yyyy</div>
                            <div className={styles.bookmark}>
                                <button>
                                    <i className="fas fa-bookmark"></i>
                                </button>
                            </div>
                            <div className="title">Article title</div>
                            <div className={styles.avatar}>
                                <img
                                    src="/images/avatar.png"
                                    className="image-size1"
                                />
                            </div>
                            <div className={styles.details2}>
                                <div className={styles.username}>@username</div>
                                <div className={styles.category}>category:</div>
                            </div>
                            <div className={styles.article_content}>
                                content: dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh dbfbd
                                fjndf,mnabmnbfdm,fnas,vmnsbfamsb fjgkjhkldhdgf
                                fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                <h2>
                                    <a>Read more.....</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div id="center" className={styles.article_list}>
                            <div className={styles.date}>dd/mm/yyyy</div>
                            <div className={styles.bookmark}>
                                <button>
                                    <i className="fas fa-bookmark"></i>
                                </button>
                            </div>
                            <div className="title">Article title</div>
                            <div className={styles.avatar}>
                                <img
                                    src="/images/avatar.png"
                                    className="image-size1"
                                />
                            </div>
                            <div className={styles.details2}>
                                <div className={styles.username}>@username</div>
                                <div className={styles.category}>category:</div>
                            </div>
                            <div className={styles.article_content}>
                                content: dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh dbfbd
                                fjndf,mnabmnbfdm,fnas,vmnsbfamsb fjgkjhkldhdgf
                                fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                dbfbdfjndf,mnabmnbfdm,fnas,vmnsbfamsb
                                fjgkjhkldhdgf fkgjkh fjghgkh gkgjh
                                <h2>
                                    <a>Read more.....</a>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
