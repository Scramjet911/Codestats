import Head from "next/head";
import Link from "next/link";

function Profileleft(props) {
  return (
    <div>
      <img src="/images/loginImg.JPG" alt="..." />
      <h1 className="namepr mt-3">Userv Name</h1>
      <p className="bio mt-3">Just a few words about yourself.</p>
      <p className="uname mt-3 ml-5">@usernames</p>
      <br />
      {props.logged == 0 && (
        <a className="btn btn-outline-success text-white ml-5" role="button">
          FOLLOW
        </a>
      )}
      <p className="h3 mt-4">About</p>
      <hr className="hr" />
      <p className="h4">Education</p>
      <p className="bio mt-2">Bachelor of Technology</p>
      <p className="bio">Government Engineering College, Thrissur</p>
    </div>
  );
}
export default Profileleft;
