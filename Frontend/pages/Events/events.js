import Head from 'next/head' 
import Link from 'next/link'
import Layout from '../../components/layout'
import Top from '../../components/top'
import {Searchbar} from 'react-bootstrap'
import Clock from 'react-live-clock'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from '../../node_modules/react-bootstrap'
export default function Events() {
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
                  <h2 className="nav-pages-discussion">Upcoming Events</h2>
        </div>
               <div className="row">
                 <div className="column">
                  <div className="event-card" style={{top:"150px",bottom:"10px",left:"30px"}}>
                          <div className="title">Event Name</div>
                          <div className="avatar">
                            <img src="/images/download.jpg" className="image-size1"/>
                          </div>
                          <p className="username" style={{top:"-50px",left:"80px"}}>platform</p>
                          <p className="date-text" style={{top:"-70px",left:"80px"}}>date</p>
                          <p className="question" style={{top:"-65px",aligntext:"center"}}>
                            Event details asnd dshdfl hfkldjflk jhklajfkla kjfklajfkl jhlafklksj jhklfj
                            <button type="submit" style={{position:"relative",top:"80px", width:"100px",left:"10px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Register</button>
                            <button type="submit" style={{position:"relative",left:"30px",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Remind</button>
                          </p>
                    </div>
                 </div>
                 <div className="column">
                 <div className="event-card" style={{top:"150px",bottom:"10px",left:"30px"}}>
                          <div className="title">Event Name</div>
                          <div className="avatar">
                            <img src="/images/download.jpg" className="image-size1"/>
                          </div>
                          <p className="username" style={{top:"-50px",left:"80px"}}>platform</p>
                          <p className="date-text" style={{top:"-70px",left:"80px"}}>date</p>
                          <p className="question" style={{top:"-65px",aligntext:"center"}}>
                            Event details asnd dshdfl hfkldjflk jhklajfkla kjfklajfkl jhlafklksj jhklfj
                            <button type="submit" style={{position:"relative",top:"80px",left:"10px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Register</button>
                            <button type="submit" style={{position:"relative",left:"30px",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Remind</button>
                          </p>
                 </div>
              </div>
             </div>    
           </div>
  )
}