import Head from "next/head";
import Top from "../../components/top.js";
import Link from "next/link";
import Profileleft from "../../components/profileleft.js";
import Profilearticle from "../../components/profilearticle.js";
import Savedarticles from "../../components/savedarticles.js";
import Addeventcard from "../../components/addeventcard.js";

function Dashboard() {
    return (
        <div>
            <Head>
                <title>User Dashboard</title>
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
            <div>
                <Top />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3 mt-5">
                        <Profileleft logged={1} />
                    </div>
                    <div className="col-9 mt-5 ">
                        <Addeventcard />
                        <Profilearticle
                            logged={1}
                            user={"Userv"}
                            articleCount={45}
                        />
                        <Savedarticles />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;