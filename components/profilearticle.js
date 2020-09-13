import Head from "next/head";
import Link from "next/link";

function Profilearticle(props) {
  const test = props.logged;
  return (
    <div>
      <div className="jumbotron j1 text-white">
        {props.logged == 1 && (
          <div>
            <h1 className="display-4">My Articles</h1>
            <h2>You have written {props.articleCount} articles</h2>
          </div>
        )}
        {props.logged == 0 && (
          <div>
            <h1 className="display-4">Articles</h1>

            <h2>
              {props.user} has written {props.articleCount} articles
            </h2>
          </div>
        )}
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
export default Profilearticle;
