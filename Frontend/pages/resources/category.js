import Head from "next/head";
import dynamic from 'next/dynamic'
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});;
import styles from "./resource.module.scss";
import { Component } from "react";
import Router from "next/router";

const categoryurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/resource/":"http://localhost:8000/api/resource/";

class Display extends Component{
    state = {
        categorylist : [],
        loaded : false
    }
    componentDidMount(){
        fetch(categoryurl,{
            method: 'GET',
            headers: {
                'Accept':'application/json'
            }
        })
        .then(data=>{
            if(data.status==400){
                console.log("Server Error");
            }
            else{
                data.json().then((cats) =>{
                    this.setState({categorylist:cats});
                    this.setState({loaded:true});
                });
            }
        })
        .catch(err=>console.log("Error",err));
    }

    openResource = (name)=>{
        Router.push(`/resources/view?cat=${name}`);
    }

    render(){
        return (
            <div>
                <Head>
                    <title>resources</title>
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
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    ></meta>
                </Head>
                <Navbar />
                <div>
                    <h2 className={styles.page_title}>Resources</h2>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="Search by category" />
                    <div className={styles["search-btn"]}>
                        <button type="submit" className={styles["search-btn"]}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="row">
                        {this.state.loaded && (
                            this.state.categorylist.map((cats, index)=>{
                                cats.name = cats.name.charAt(0).toUpperCase() + cats.name.slice(1);
                                return (
                                <div className="column" key={index}>
                                    <div
                                        className={styles.resource_cards}
                                        onClick={()=>this.openResource(cats.name)}
                                    >
                                        <div id="center" className={styles.icon}>
                                            <div className="avatar">
                                                <img
                                                    src="/images/react.png"
                                                    className="image-size1"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.category}>
                                            <h2>{cats.name}</h2>
                                        </div>
                                        <div className={styles.count}>
                                            <h1>{cats.resourceCount}</h1>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Display;