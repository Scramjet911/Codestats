import Head from 'next/head' 
import Link from 'next/link'
import Layout from '../../components/layout'
import Top from '../../components/top'
import {Searchbar} from 'react-bootstrap'
import Clock from 'react-live-clock'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
export default function     Articles() {
  return (
           <div>
             
             <Head>
               <title>Display</title>
               <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
               <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
               <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>
             </Head>
             <div>
          <Top/>
        </div>
        <div id="center">
          <h2 className="nav-pages-discussion">Articles</h2>
        </div> 
        <div id="center">
          <div  className="search">
            <input type="text" placeholder="Search by category"/>
          </div>
          <div className="search-category">
            <button type="submit" className="search-btn">
              <i class="fa fa-search"></i>
            </button>
          </div> 
        </div>
        <div id="left"  style={{left:"30px"}}>
          <div className="article-category">Category</div>
        </div> 
        <div>
          <div className="row">
            <div id="center" className="article-list">
              <div id="left" className="icon">
                <div style={{left:"-80px",top:"-10px"}} className="avatar">
                   <img src="/images/avatar.png" className="image-size1"/>
                </div>
              </div> 
              <div className="article-title">
                <div className="title">Article title</div>    
              </div>
              <div>
                <p className="username" style={{top:"-30px",left:"-10px"}}>@username</p>
                <p className="date-text" style={{top:"-62px",left:"120px"}}>date</p> 
              </div> 
              <div  className="question" style={{top:"-50px",left:"-10px"}}>
                fjhgkjghkj fjhgkjhk ghjkhlk fjhgkjhk gkhjklkv ghgkjhk gjgkjh gkh hjgjhg jhgjh gjhg hgkjhkj ghjfgjhgkjhk hjfjhgkjhk hjgjgkjhlk gjhgkjhklj gjhgkjhkj hkjlkjk hkjhlkjlj gjkghjkh 
                <h1><a>Read more......</a></h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div id="center" className="article-list">
              <div id="left" className="icon">
                <div style={{left:"-80px",top:"-10px"}} className="avatar">
                  <img src="/images/avatar.png" className="image-size1"/>
                </div>
              </div> 
              <div className="article-title">
                <div className="title">Article title</div>    
              </div>
              <div>
                <p className="username" style={{top:"-30px",left:"-10px"}}>@username</p>
                <p className="date-text" style={{top:"-62px",left:"120px"}}>date</p> 
              </div> 
              <div  className="question" style={{top:"-50px",left:"-10px"}}>
                fjhgkjghkj fjhgkjhk ghjkhlk fjhgkjhk gkhjklkv ghgkjhk gjgkjh gkh hjgjhg jhgjh gjhg hgkjhkj ghjfgjhgkjhk hjfjhgkjhk hjgjgkjhlk gjhgkjhklj gjhgkjhkj hkjlkjk hkjhlkjlj gjkghjkh 
                <h1><a>Read more......</a></h1>
              </div>
            </div>
          </div>
        </div>    
      </div>
  )
}