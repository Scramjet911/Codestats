import Link from "next/link";

function Categorysidecard(props) {
  return (
    <div>
      <div className="card text-white bg-dark mb-3">
        <h5 className="card-header align-self-center">
          <a className="text-link " href={props.goto}>
            {props.content}
          </a>
        </h5>
      </div>
    </div>
  );
}
export default Categorysidecard;
