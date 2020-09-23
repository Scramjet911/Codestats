import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
const Navbar = dynamic(import("../../components/Top/navbar"), { ssr: false });
import styles from "./article.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const API = 
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api"
        : "http://localhost:8000/api";

export default function Articles() {
    const [articles, setarticles] = useState([]);
    const [article, setarticle] = useState([]);
    const [category, setcategory] = useState("");

    const router = useRouter();
    const readmore = (event) => {
        event.preventDefault();
        const id = event.target.id;
        router.push(`/Articles/view?id=${id}`);
    };
    useEffect(() => {
        const result = fetch(`${API}/article`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setarticles(data);
                setarticle(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);
    const handleChange = (event) => {
        setcategory(event.target.value);
    };
    const onSearch = (event) => {
        event.preventDefault();
        console.log(category);
        var data = [];
        articles.forEach((element) => {
            console.log(element.category);
            element.category.forEach((item) => {
                if (item == category) {
                    console.log(category);
                    data.push(element);
                }
            });
        });
        setarticle(data);
        console.log(article);
    };
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
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
            </Head>
            <Navbar />
            <div id="center">
                <h2 className={styles.page_title}>Articles</h2>
            </div>
            <div id="center">
                <div className="search">
                    <input
                        type="text"
                        value={category}
                        onChange={handleChange}
                        placeholder="Search by category"
                    />
                </div>
                <div className="search-category">
                    <button
                        type="submit"
                        onClick={onSearch}
                        className="search-btn"
                    >
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div className={styles.wrapper}>
                {article &&
                    article.map((item) => {
                        return (
                            <div>
                                <div>
                                    <div className={styles.article_category}>
                                        {item.category.map((item) => {
                                            return item;
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <div className="row">
                                        <div
                                            id="center"
                                            className={styles.article_list}
                                        >
                                            <div className={styles.date}>
                                                {new Date(item.createdAt).toDateString()}
                                            </div>

                                            <div className={styles.bookmark}>
                                                <button>
                                                    <i className="fas fa-bookmark"></i>
                                                </button>
                                            </div>
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className={styles.avatar}>
                                                <img
                                                    src="/images/avatar.png"
                                                    className="image-size1"
                                                />
                                            </div>
                                            <div className={styles.details2}>
                                                <div
                                                    className={styles.username}
                                                >
                                                    @{item.author.username}
                                                </div>
                                                {item.category.map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={styles.tags}
                                                        >
                                                            {item}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div
                                                className={styles.article_content}
                                            >
                                                <h2>
                                                    <Link href="#">
                                                        <a
                                                            onClick={readmore}
                                                            id={item._id}
                                                        >
                                                            Read more..
                                                        </a>
                                                    </Link>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
