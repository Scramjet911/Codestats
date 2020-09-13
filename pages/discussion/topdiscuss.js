import Head from "next/head";
import Link from "next/link";
import Top from "../../components/top";

function Topdiscuss() {
    return (
        <div>
            <Head>
                <title>Discuss</title>
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
            <div>
                <div className="search-d">
                    <input type="text" placeholder="Search...." />
                </div>
                <div className="search-discuss">
                    <button type="submit" className="search-btn">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div>
                <h1 className="title-discuss">Top discussions</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-7 mtopdiscuss pl-4">
                        <h1>TOPIC</h1>
                    </div>
                    <div className="col-3 mtopdiscuss"></div>
                    <div className="col-1 mtopdiscuss">Replies</div>
                    <div className="col-1 mtopdiscuss">Activity</div>
                </div>
                <hr className="hr-original" />
                <div className="row">
                    <div className="col-7 pl-4 ">
                        <p className="text-discuss">
                            There are going to be 3 parts of the while series ,
                            each part having difficulty level higher than the
                            previous level.{" "}
                        </p>

                        <p className="tags-discuss">react</p>
                        <p className="tags-discuss">bootstrap</p>
                        <p className="tags-discuss">node</p>
                    </div>
                    <div className="col-3">
                        <img
                            src="/images/avatar.png"
                            className="image-discuss"
                        />
                        <img
                            src="/images/loginImg.JPG"
                            className="image-discuss"
                        />
                        <img
                            src="/images/download.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/codechef.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/codechef.jpg"
                            className="image-discuss"
                        />
                    </div>
                    <div className="col-1">35</div>
                    <div className="col-1">3d</div>
                    <div className="col-1"></div>
                </div>
                <hr className="hr" />
                <div className="row">
                    <div className="col-7 pl-4 ">
                        <p className="text-discuss">
                            The border-style property can have from one to four
                            values
                        </p>

                        <p className="tags-discuss">node</p>
                        <p className="tags-discuss">bootstrap</p>
                        <p className="tags-discuss">react</p>
                    </div>
                    <div className="col-3">
                        <img
                            src="/images/download.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/codechef.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/loginImg.JPG"
                            className="image-discuss"
                        />
                        <img
                            src="/images/avatar.png"
                            className="image-discuss"
                        />
                    </div>
                    <div className="col-1">35</div>
                    <div className="col-1">3d</div>
                    <div className="col-1"></div>
                </div>
                <hr className="hr" />
                <div className="row">
                    <div className="col-7 pl-4 ">
                        <p className="text-discuss">
                            The border-style property can have from one to four
                            values
                        </p>

                        <p className="tags-discuss">node</p>
                        <p className="tags-discuss">bootstrap</p>
                        <p className="tags-discuss">react</p>
                    </div>
                    <div className="col-3">
                        <img
                            src="/images/download.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/codechef.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/loginImg.JPG"
                            className="image-discuss"
                        />
                        <img
                            src="/images/avatar.png"
                            className="image-discuss"
                        />
                    </div>
                    <div className="col-1">35</div>
                    <div className="col-1">3d</div>
                    <div className="col-1"></div>
                </div>
                <hr className="hr" />
                <div className="row">
                    <div className="col-7 pl-4 ">
                        <p className="text-discuss">
                            The border-style property can have from one to four
                            values
                        </p>

                        <p className="tags-discuss">node</p>
                        <p className="tags-discuss">bootstrap</p>
                        <p className="tags-discuss">react</p>
                    </div>
                    <div className="col-3">
                        <img
                            src="/images/download.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/codechef.jpg"
                            className="image-discuss"
                        />
                        <img
                            src="/images/loginImg.JPG"
                            className="image-discuss"
                        />
                        <img
                            src="/images/avatar.png"
                            className="image-discuss"
                        />
                    </div>
                    <div className="col-1">35</div>
                    <div className="col-1">3d</div>
                    <div className="col-1"></div>
                </div>
                <hr className="hr" />
            </div>
        </div>
    );
}
export default Topdiscuss;
