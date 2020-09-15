import Head from "next/head";

const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});

import Profileleft from "../../components/profileleft.js";
import Profilearticle from "../../components/profilearticle.js";
import Savedarticles from "../../components/savedarticles.js";
import Addeventcard from "../../components/addeventcard.js";

import {useState,useEffect} from 'react'
import { isAuthenticated } from '../../components/auth/index';
import dynamic from "next/dynamic";


const API = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api":"http://localhost:8000/api";
function Dashboard() {
  const [profile,setprofile]=useState([])
  const [loaded, setloaded]=useState(false);
  console.log(API)
  useEffect(() => {
    
 const {user,token}=isAuthenticated();
 console.log(user)
 
    fetch(`${API}/user/${user._id}`,{
    method:"GET",
    headers:{
    "Authorization" : `Bearer ${token}`}
  }).then(
       
        res => res.json()
          ).then(data=>{
            console.log(data)
            setprofile(data)
            setloaded(true);
          
        }
        

    )
    .catch(err=>console.log(err));
    
},[])
  return (
    <div>
      <Head>
        <title>User Dashboard</title>
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3 mt-5">
            {loaded && (<Profileleft logged={1} profile={profile} />)}
          </div>
          <div className="col-9 mt-5 ">
            {loaded && (<>
            <Addeventcard />
            <Profilearticle logged={1}  profile={profile}/>
            <Savedarticles  profile={profile}/>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );

}
export default Dashboard;
