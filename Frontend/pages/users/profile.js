import Head from "next/head";
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});
import dynamic from 'next/dynamic'
const Profileleft = dynamic(import("../../components/profileleft.js"),{ssr:false});
const Profilearticle = dynamic(import("../../components/profilearticle.js"),{ssr:false});
import { Component } from "react";

const profileurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/user/":"http://localhost:8000/api/user/";

class Profile extends Component{
    state={
        userdata:null
    }
    componentDidMount(){
        let localval = localStorage.getItem('jwt');
        if(localval && localval.user){
            fetch(profileurl+localval.user._id,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${localval.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(data=>{
                if( data.status == 400 || data.status == 403){
                    let err = new Error();
                    err.name = 'Access Denied';
                    throw err;
                }
                return data.json();
            })
            .then(user=>{
                this.setState({userdata:user});
            })
            .catch(e=>console.log("Error Fetching User Data",e));
        }
    }
    render(){
        return (
            <div>
                <Head>
                    <title>User Profile</title>
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
                            <Profileleft logged={0} user={this.state.userdata}/>
                        </div>
                        <div className="col-9 mt-5">
                            <Profilearticle
                                logged={0}
                                articleCount={45}
                                profile={this.state.userdata}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile;
