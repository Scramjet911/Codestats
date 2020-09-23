import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function Profilearticle(props) {
  const test = props.logged;
  const profile=props.profile
  const router=useRouter()
  const readmore=(event)=>{
    event.preventDefault();
    const id=event.target.id
    router.push(`/Articles/view?id=${id}`)
  }
  if(profile){
  console.log(profile.posts)
  return (
    <div>
      <div className="jumbotron j1 text-white">
        {props.logged == 1 && (
          <div>
            <h1 className="display-4">My Articles</h1>

        <h2>You have written {profile.posts && (<span>{profile.posts.length}</span>)} articles</h2>

          </div>
        )}
        {props.logged == 0 && (
          <div>
            <h1 className="display-4">Articles</h1>

            <h2>
              {profile.username} has written {profile.posts.length} articles
            </h2>
          </div>
        )}
        {profile.posts && profile.posts.map((item)=>{
          return(
            <div>
              <hr className="hr mx-5" />
              <h5>
         {item.title}
        </h5>
        <button className="btn btn-outline-light" onClick={readmore} id={item._id}>Read more..</button>
                  
               
            </div>
          )
        })}
      </div>
    </div>
  );
      }
      return <></>
}
export default Profilearticle;
