import Head from 'next/head' 
import Link from 'next/link'
import Layout from '../../components/layout'
import Top from '../../components/top'
import {Searchbar} from 'react-bootstrap'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
export default function Display() {
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
                <h2 className="nav-pages-discussion">Resources</h2>
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
                <div>
                  <div className="row">
                    <div className="column">
                      <div  className="resource-cards ">
                        <div id="center" className="icon">
                          <div className="avatar">
                            <img src="/images/react.png" className="image-size1"/>
                          </div>
                        </div>
                        <div className="category">
                          <h2 >React</h2>
                        </div>
                        <div className="count">
                          <h1>10</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>    
              </div>
  )
}