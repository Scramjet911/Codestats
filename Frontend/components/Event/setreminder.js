import { useForm } from "react-hook-form";
import style from "./event.module.css";
import Modal from "react-modal";

const reminderurl =
    process.env.NODE_ENV === "production"
    ? "//codestats-test.herokuapp.com/api/user/event/"
    : "http://localhost:8000/api/user/event/";

const opthours = ["1", "2", "3", "4", "8", "10", "12"];
const optdays = ["1", "2", "3", "4"];
const optmins = ["5", "10", "15", "30", "45"];

function beforeDate(eventdate, data, unit){
    if(unit==="hours"){
        return new Date(eventdate.getTime() - (parseInt(data)*60)*60000).toISOString();
    }
    else if(unit==="days"){
        return new Date(eventdate.getTime() - (parseInt(data)*24*60)*60000).toISOString();
    }
    return new Date(eventdate.getTime() - (parseInt(data))*60000).toISOString();
}

function SetReminder(props) {
    if (typeof(window) !== 'undefined') {
        Modal.setAppElement('body')
    }
    const { register, handleSubmit, watch, setValue } = useForm();
    
    const onSubmit = (data, e) => {
        let localval = localStorage.getItem('jwt');
        if(localval){
            let reqbody = {};
            if(data.nremind !== "Never"){
                let eventdate = new Date(props.eventTime);
                let reminders = [], vals=['A','B','C'];
                for (let i = 0; i < parseInt(data.nremind); i++) {
                    reminders.push(beforeDate(eventdate, data["num"+vals[i]],data["dur"+vals[i]]));
                }
                console.log(reminders);
                reqbody = {notify:reminders}
            }
            reqbody.eventId = props.eventId;

            localval = JSON.parse(localval);
            fetch(reminderurl+`${localval.user._id}`,{
                method: "POST",
                headers: {
                    "Authorization":`Bearer ${localval.token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(reqbody)
            })
            .then(data=>data.json())
            .then(response=>{console.log(response);})
        }
        // console.log(data);

        e.target.reset();
        props.handleClose();
    }
    const watchNR = watch("nremind", "Never");
    const watchDurA = watch("durA", "mins");
    const watchDurB = watch("durB", "mins");
    const watchDurC = watch("durC", "mins");
    // console.log(props);
    return (
        <Modal
        isOpen={props.isOpen}
        onRequestClose={()=>{
            setValue("nremind","Never");
            props.handleClose();
            }}
        overlayClassName={style["modal-overlay"]}
        className={style["modal-content"]}
        >
        <div className={`${style["title"]} justify-content-center`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`${style["reminder-form"]}`}>
                <div className="form-row justify-content-center">
                    <div className="col-5">
                        <label>Remind me</label>
                    </div>
                    <div className={`col-4 ${style["dropdown-container"]}`}>
                        <select
                            name="nremind"
                            className={`form-control-sm ${style["dropdown-list"]}`}
                            ref={register}
                        >
                            <option defaultValue>Never</option>
                            <option value="1">Once</option>
                            <option value="2">Twice</option>
                            <option value="3">Thrice</option>
                        </select>
                        <div className={style["dropdown-list-icon"]}></div>
                    </div>
                </div>
                {watchNR >= 1 && (
                    <div className="form-row flex-row-reverse mt-3 justify-content-center">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className={`form-control-sm ${style["dropdown-list"]}`}
                                name="durA"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                            <div className={style["dropdown-list-icon"]}></div>
                        </div>
                        {watchDurA == "mins" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numA"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                        <div className={style["dropdown-list-icon"]}></div>

                            </div>
                        )}
                        {watchDurA == "hours" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numA"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                        {watchDurA == "days" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numA"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                    </div>
                )}
                {watchNR >= 2 && (
                    <div className="form-row flex-row-reverse mt-3 justify-content-center">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className={`form-control-sm ${style["dropdown-list"]}`}
                                name="durB"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select><div className={style["dropdown-list-icon"]}></div>
                        </div>
                        {watchDurB == "mins" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numB"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                        {watchDurB == "hours" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numB"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                        {watchDurB == "days" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numB"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                    </div>
                )}
                {watchNR >= 3 && (
                    <div className="form-row flex-row-reverse mt-3 justify-content-center">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className={`form-control-sm ${style["dropdown-list"]}`}
                                name="durC"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select><div className={style["dropdown-list-icon"]}></div>
                        </div>
                        {watchDurC == "mins" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numC"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                        {watchDurC == "hours" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numC"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                        {watchDurC == "days" && (
                            <div className="col-auto">
                                <select
                                    className={`form-control-sm ${style["dropdown-list"]}`}
                                    name="numC"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select><div className={style["dropdown-list-icon"]}></div>
                            </div>
                        )}
                    </div>
                )}
                <div className = "col-auto d-flex justify-content-center">
                <button
                    type="submit"
                    className={`btn ${style["submit-btn"]} my-4`}
                    // onClick={handleSubmit(onSubmit)}
                >
                    Save Event
                </button>
                </div>
            </form>
        </div>
        </Modal>
    );
}
SetReminder.defaultProps = {
    nremind: "0",
    durA: "mins",
    durB: "mins",
    durC: "mins",
    // numA: "5",
    // numB: "5",
};
export default SetReminder;
