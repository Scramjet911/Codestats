import style from "./resource.module.css";

function Resourceitem(props) {
    return (
            <div className={style["resource-item"]}>
                <a className={style["text-link"]} href={props.goto}>
                    {props.content}
                </a>
            </div>
    );
}
export default Resourceitem;
