import Link from "next/link";

function Resourceitem(props) {
  return (
    <div>
      <div className="resource-item">
        <a className="text-link" href={props.goto}>
          {props.content}
        </a>
      </div>
    </div>
  );
}
export default Resourceitem;
