import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function Savedarticles(props) {
  const profile=props.profile;
  const router=useRouter()
  const readmore=(event)=>{
    event.preventdefault();
    id=event.target.id
    router.push(`/Articles/view_article?id=${id}`)
  }

  return (
    <div>
      <div className="jumbotron j1 shadow text-white">
        <h1 className="h2">Saved Articles</h1>

      <p>You have  {profile.savedarticles &&(<span>{profile.savedarticles.length ===0?"no":profile.savedarticles.length}</span>)} savedarticles</p>
      {profile.savedarticles &&profile.savedarticles.length !=0 && (
        <div>
          {profile.savedarticles.map((item)=>{
            return(<div>
                 <hr className="hr mx-5" />
                <h5>
                 {item.title}
                </h5>
                <a ><button className="btn btn-outline-light" onClick={readmore} id={item._id}>Read more..</button>
                  
                </a>
               </div>)
          })}
       </div>
      )}
       
        
        {/* <hr className="hr mx-5" />

        <div className="row justify-content-end ">
          <a className="btn btn-see btn-outline-light " href="#" role="button">
            SEE ALL
          </a>
        </div> */}

      </div>
    </div>
  );
}
export default Savedarticles;
