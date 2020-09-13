import Link from "next/link";
import { useForm } from "react-hook-form";

const opthours = ["1", "2", "3", "4", "8", "10", "12"];
const optdays = ["1", "2", "3", "4"];
const optmins = ["5", "10", "15", "30", "45"];
function Setreminder(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    const watchNR = watch("nremind", props.nremind);
    const watchDurA = watch("durA", props.durA);
    const watchDurB = watch("durB", props.durB);
    const watchDurC = watch("durC", props.durC);
    return (
        <div className="text-dark row justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="col-7">
                        <label>Remind me</label>
                    </div>
                    <div className="col-2">
                        <select
                            name="nremind"
                            className="form-control-sm"
                            ref={register}
                        >
                            <option selected>Choose</option>
                            <option value="1">once</option>
                            <option value="2">twice</option>
                            <option value="3">thrice</option>
                        </select>
                    </div>
                </div>
                {watchNR >= 1 && (
                    <div className="form-row flex-row-reverse mt-3">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className="form-control-sm"
                                name="durA"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                        </div>
                        {watchDurA == "mins" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numA"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurA == "hours" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numA"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurA == "days" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numA"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
                {watchNR >= 2 && (
                    <div className="form-row flex-row-reverse mt-3">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className="form-control-sm"
                                name="durB"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                        </div>
                        {watchDurB == "mins" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numB"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurB == "hours" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numB"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurB == "days" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numB"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
                {watchNR >= 3 && (
                    <div className="form-row flex-row-reverse mt-3">
                        <div className="col-auto">
                            <label>Before</label>
                        </div>
                        <div className="col-auto">
                            <select
                                className="form-control-sm"
                                name="durC"
                                ref={register}
                            >
                                <option value="mins">mins</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                        </div>
                        {watchDurC == "mins" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numC"
                                    ref={register}
                                >
                                    {optmins.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurC == "hours" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numC"
                                    ref={register}
                                >
                                    {opthours.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {watchDurC == "days" && (
                            <div className="col-auto">
                                <select
                                    className="form-control-sm"
                                    name="numC"
                                    ref={register}
                                >
                                    {optdays.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
                <button
                    type="submit"
                    className="btn btn-success float-right my-4"
                    onClick={props.handleClose}
                >
                    Save Event
                </button>
            </form>
        </div>
    );
}
Setreminder.defaultProps = {
    nremind: "0",
    durA: "mins",
    durB: "mins",
    durC: "mins",
    numA: "5",
    numB: "5",
};
export default Setreminder;
