import Link from "next/link";
import { useForm } from "react-hook-form";

function Eventform(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  return (
    <div className="row justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row mt-3">
          <label for="title" className="mt-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control ml-5"
            placeholder="Enter event title"
            ref={register}
          ></input>
        </div>
        <div className="form-group row">
          <label for="link" className="mt-1">
            Link
          </label>
          <input
            type="url"
            name="link"
            className="form-control ml-5"
            placeholder="Enter contest URL"
            ref={register}
          ></input>
        </div>
        <div className="form-group row mt-4">
          <label for="starttime">Starts at</label>
          <input
            type="time"
            name="starttime"
            className="form-control-sm ml-2"
            ref={register}
          ></input>
          <label for="startdate" className="ml-2">
            On
          </label>
          <input
            type="date"
            name="startdate"
            className="form-control-sm ml-2"
            ref={register}
          ></input>
        </div>
        <div className="form-group row mt-4">
          <label for="endtime">Ends at</label>
          <input
            type="time"
            name="endtime"
            className="form-control-sm ml-3"
            ref={register}
          ></input>
          <label for="enddate" className="ml-2">
            On
          </label>
          <input
            type="date"
            name="enddate"
            className="form-control-sm ml-2"
            ref={register}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-outline-light float-right my-4"
          onClick={props.handleClose}
        >
          ADD TO LIST
        </button>
      </form>
    </div>
  );
}
export default Eventform;
