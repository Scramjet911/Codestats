import Head from "next/head";
import dynamic from 'next/dynamic'
const Navbar = dynamic(import("../../components/Top/navbar"),{ssr:false});;
import styles from "./article.module.css";
import LikeButton from "../../components/like";
import { useEffect, useState } from "react";

import { isAuthenticated } from "../../components/auth";
const API = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api":"http://localhost:8000/api";
const Quill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

export default function ViewArticle() {
    
    const[article,setarticle]=useState(null);
    const[comment,setcomment]=useState("");
    const[comments,setcomments]=useState([])
    
    const f=()=>{
        let id=""
            if (typeof window != "undefined"){
                let queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const qid = urlParams.get('id')
                 id=qid
                } 
        
        fetch(`${API}/article/getallcomment/${id}`,{
        method:"GET"}).then(
           
            res => res.json()).then(data=>{
              setcomments(data)
              console.log(data)
            }
            
    
        )
        .catch(err=>console.log(err));
        }


    useEffect(()=>{
        let id=""
        if (typeof window != "undefined"){
            let queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const qid = urlParams.get('id')
        
                id=qid
            console.log(id)
        
            } 
        fetch(`${API}/article/${id}`,{
            method:"GET"}).then(
               
                res => res.json()).then(data=>{
                  setarticle(data)
                  console.log(data)
                }
                
        
            )
            .catch(err=>console.log(err));
                
            f()
          
        },[])
        const handleChange = (event) => {
                setcomment( event.target.value);
            }
        const commentpost=(event)=>{
            event.preventDefault()
            let id=""
            if (typeof window != "undefined"){
                let queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const qid = urlParams.get('id')
                 id=qid
                } 
            const {user,token}=isAuthenticated()
            fetch(`${API}/article/addcomment/${user._id}/${id}`,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    "body":`${comment}`
                })
            }).then(resposnse =>{
                if(resposnse.status!=200){
                    console.log("error in comment send")
                    return;
                }
            
            f()
            setcomment("")

            })
            .catch(err=>console.log(err));
           
           
        }
    return (
        <div>
            <Head>
                <title>View article</title>
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
            <Navbar />

            <div id="row">
               {article &&( <div className={styles.article_body}>
                    <div className={styles.date}>{new Date(article.createdAt).toDateString()}</div>
                    <div className={styles.bookmark}>
                        <button>
                            {" "}
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                    <div className="title">{article.title}</div>
                    <div className={styles.avatar}>
                        <img src="/images/avatar.png" className="image-size1" />
                    </div>
                    <div className={styles.details2}>
                    <div className={styles.username}>@{article.author &&(<span>{article.author.username}</span>)} </div>
                        <div className={styles.category}>category:{article.category && article.category.map(item=>{
                                    return item
                                })}</div>
                    </div>
                    <div className={styles.article_content}><div>
                    <Quill 
                                value={article.body} 
                                readOnly={true}
                                theme="snow"
                                modules={{toolbar:false}}
                            /></div></div>
                    <div className={styles.hl} />
                    <div className="row">
                        <div className={styles.reaction}>
                            <div className={styles.like}>
                                <LikeButton />
                            </div>
                            <div className={styles.comment}>
                                <i class="far fa-comment"></i> 0
                            </div>
                        </div>
                    </div>
                    <div className={styles.conversation}>
                        <textarea
                            className={styles.control}
                            placeholder="Comment here....."
                            onChange={handleChange}
                            value={comment}
                        />
                        <div>
                        <button type="button" class="btn btn-primary" onClick={commentpost}>post</button>
                        </div>
                        Comment List:
                        {comments && comments.length!=0 &&( comments.map((item)=>{
                            return(
                            <div id="row">
                            <div className={styles.username}>@{item.author.username}</div>
                            <div className={styles.reply}>
                                {item.body}
                            </div>
                        </div>)
                        }))}
                    </div>

                </div>)}

            </div>
        </div>
    );
}
