import Head from "next/head";
import Link from "next/link";

function Savedarticles() {
  return (
    <div>
      <div className="jumbotron j1 shadow text-white">
        <h1 className="h2">Saved Articles</h1>
        <p>You have saved 20 articles</p>
        <hr className="hr mx-5" />
        <h5>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </h5>
        <a className="btn btn-outline-light" href="#" role="button">
          Read more
        </a>
        <hr className="hr mx-5" />
        <h5>Everything to know about React and bootstrap.</h5>
        <a className="btn btn-outline-light " href="#" role="button">
          Read more
        </a>
        <hr className="hr mx-5" />
        <div className="row justify-content-end ">
          <a className="btn btn-see btn-outline-light " href="#" role="button">
            SEE ALL
          </a>
        </div>
      </div>
    </div>
  );
}
export default Savedarticles;
