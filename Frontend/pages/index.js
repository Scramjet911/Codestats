import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/Top/navbar";
import dynamic from 'next/dynamic'
import styles from "../styles/Home.module.css";
const EventsList = dynamic(() => import("../components/Event/Event_card"), {
    ssr: false,
});

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>CodeStats</title>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="A website For Competitive Coders"
                />
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
            <div className="home-body">
                <img src="https://vectr.com/riswana/bkFZxjLfQ.svg?width=550&height=550&select=bkFZxjLfQpage0" />
            </div>
            <div className="events">
                <div className="event-title-card">
                    <div className="event-title-content">
                        <img src="/images/event2.png" className="image-size2" />
                        Upcoming Events
                    </div>
                </div>
                <EventsList />
            </div>

            <div className="about-description" id="about">
                <div className="grad-text">About</div>
            </div>
            <div className="connect-body">
                <hr className="line2"></hr>
                <div
                    className="container row"
                    style={{ width: "150%", textAlign: "center" }}
                >
                    <div className="column">
                        <h1 className="connect-text">
                            <i className="fab fa-linkedin"></i> Linked In
                            <p className="sub">@qwertyu</p>
                        </h1>
                    </div>
                    <div className="column">
                        <h1 className="connect-text">
                            <i className="fab fa-facebook"></i> Facebook
                            <p className="sub">@qwertyu</p>
                        </h1>
                    </div>
                    <div className="column">
                        <h1 className="connect-text">
                            <i className="fab fa-instagram"></i> Instagram
                            <p className="sub">@qwertyu</p>
                        </h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
