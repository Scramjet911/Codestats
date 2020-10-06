function Categorysidecard(props) {
    return (
            <div className="card text-white bg-dark mb-3">
                <h5 className="card-header align-self-center">
                    <a className={style["text-link"]} href={props.goto}>
                        {props.content}
                    </a>
                </h5>
            </div>
    );
}
export default Categorysidecard;
