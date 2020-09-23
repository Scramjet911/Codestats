import Head from "next/head";
const Navbar = dynamic(import("../../components/Top/navbar"), { ssr: false });
import styles from "./discuss.module.css";
import LikeButton from "../../components/like";
import { withRouter } from "next/router";
import { Component, createRef } from "react";
import moment from "moment";
import dynamic from "next/dynamic";
const Quill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

let discussurl =
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api/discussion/"
        : "http://localhost:8000/api/discussion/";

class ViewDiscussion extends Component {
    constructor(props) {
        super(props);
        this.commentArea = createRef();
    }
    state = {
        discuss: null,
        loaded: false,
        isLoggedIn: false,
    };

    componentDidMount() {
        let [, ...params] = this.props.router.asPath.split("?");
        params = params.join("&");
        let url = new URLSearchParams(params);

        // console.log("Inside Mount",url.get("discId"));
        fetch(discussurl + url.get("discId"), {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((data) => data.json())
            .then((discussions) => {
                this.setState({ discuss: discussions });
                this.setState({ loaded: true });
                console.log(discussions);
            })
            .catch((err) => console.log(err));

        let tokenval = localStorage.getItem("jwt");
        if (tokenval == null) {
            this.setState({ isLoggedIn: false });
        } else {
            this.setState({ isLoggedIn: true });
        }
    }

    addComment = () => {
        let localval = localStorage.getItem("jwt");
        if (localval) {
            localval = JSON.parse(localval);
            // console.log(localval);
            fetch(
                discussurl +
                    `comment/${localval.user._id}/${this.state.discuss._id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localval.token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        body: this.commentArea.current.value,
                    }),
                }
            )
                .then((data) => {
                    if (data.status !== 200) {
                        console.log("Error While Adding Comment");
                        return;
                    }
                    data.json().then((comment) => {
                        let discussval = this.state.discuss;
                        discussval.comments.push(comment);
                        this.setState({ discuss: discussval });
                    });
                })
                .catch((err) => console.log("Fetch Error"));
        }
    };

    render() {
        return (
            <div>
                <Head>
                    <title>Discussion</title>
                    <link
                        rel="apple-touch-icon"
                        href="%PUBLIC_URL%/logo192.png"
                    />
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

                {this.state.loaded && (
                    <div id="row">
                        <div className={styles.discussion_body}>
                            <div className={styles.date}>
                                {moment(this.state.discuss.createdAt).format(
                                    "MMMM Do YYYY"
                                )}
                            </div>
                            <div className="title">
                                {this.state.discuss.title}
                            </div>
                            <div className={styles.details}>
                                {this.state.discuss.category.map((cat, index) => (
                                    <div
                                        key={index}
                                        className="tags-discuss"
                                    >
                                        {cat}
                                    </div>
                                ))}
                                <div className={styles.username}>
                                    {this.state.discuss.authorname}
                                </div>
                            </div>
                            <div className={styles.content}>
                                <Quill
                                    value={this.state.discuss.body}
                                    readOnly={true}
                                    theme="snow"
                                    modules={{ toolbar: false }}
                                />
                            </div>
                            <div className={styles.hl} />

                            <div className={styles.conversation}>
                                {this.state.isLoggedIn && (
                                    <div className={styles["comment-area"]}>
                                        <textarea
                                            ref={this.commentArea}
                                            className={styles.control}
                                            placeholder="Comment here....."
                                        />
                                        <button
                                            className={styles["comment-btn"]}
                                            onClick={this.addComment}
                                        >
                                            Comment
                                        </button>
                                    </div>
                                )}
                                {!this.state.isLoggedIn && (
                                    <div className={styles.control}>
                                        Login To Comment
                                    </div>
                                )}
                                Comments:
                                {this.state.discuss.comments.map((com, index) => {
                                    return (
                                        <div key={index} id="row">
                                            <div
                                                className={styles.username}
                                            >
                                                {com.author}
                                            </div>
                                            <div className={styles.reply}>
                                                {com.body}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(ViewDiscussion);
