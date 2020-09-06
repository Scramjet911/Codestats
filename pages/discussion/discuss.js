import Head from 'next/head' 
import Link from 'next/link'
import Layout from '../../components/layout'
import Top from '../../components/top'
import {Searchbar} from 'react-bootstrap'
import Clock from 'react-live-clock'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from '../../node_modules/react-bootstrap'
export default function Discuss() {
  return (
           <Layout> 
             <Head>
               <title>Discuss</title>
               <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
               <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
               <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>
             </Head>
             <div>
          <Top/>
        </div>
                
              
              
               <div>
                 <div className="post-question">
                 <div className="question-image">?</div>
                 <div className="question-text">post a question?</div>
               </div>
             </div>
             <div className="row">
               <div className="column">
                 <div  className="discuss-body ">
                   <div className="content-title">Problem title 
                     <div className="row">
                       <div className="column">
                          <div className="username">@username</div>
                       </div>
                       <div className="column">
                          <div className="date-text">dd/mm/yyyy</div>
                       </div>
                     </div>
                     <hr className="line-break" style={{width:"100%",top:"-15px"}}></hr>
                     <div className="question">problem description
                     <div className="code">code</div>
                     <div className="row">
                        <div className="column">
                          <div className="date-text" style={{top:"10px",left:"800px",float:"right"}}>reply</div>
                       </div>
                     </div>
                     <hr className="line-break" style={{width:"100%",top:"10px"}}></hr>
                   </div>
                   <div className="answers">
                     <div className="row">
                       <div className="column">
                         <div className="username">@username</div>
                       </div>
                       <div className="column">
                         <div className="date-text">dd/mm/yyyy</div>
                       </div>
                     </div>
                     answer
                     <hr className="line-break" style={{width:"100%",top:"5px"}}></hr>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </Layout>
  )
}