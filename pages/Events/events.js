import Head from "next/head";
import Layout from "../../components/layout";
import Navbar from "../../components/Top/navbar";
import styles from "./events.module.css";
import dynamic from 'next/dynamic'
const EventsList = dynamic(()=>import('../../components/Event/Event_card'),{ssr:false}); 

export default function Events() {
    return (
        <Layout>
            <Head>
                <title>Display</title>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="HandheldFriendly" content="true"></meta>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
            </Head>
            <Navbar />
            <div>
                <h2 className={styles.page_title}>Upcoming Events</h2>
            </div>
            <div className={styles.event_list}>
                <EventsList/>
            </div>
        </Layout>
    );
}
