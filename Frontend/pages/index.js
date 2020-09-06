import Head from 'next/head'
import Layout from '../components/layout'
import Top from '../components/top'
import Chat from '../components/chat/chat'
import styles from '../styles/Home.module.css'
import Clock from 'react-live-clock'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>CodeStats</title>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app"/>
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div>
          <Top/>
        </div>
        <div className="container" id="pagebody"></div>
        <div className="events">
          <div className="event-title-card">
            <div className="event-title-content"><img src="/images/event2.png" className="image-size2"/>Upcoming Events</div>
          </div>
          <div className="event-group mini-card-grid">
            <div className="card-pos">
             <div className="event-card">
               <div className="title">Event Name</div>
               <div className="avatar"><img src="/images/download.jpg" className="image-size1"/></div>
               <p className="username" style={{top:"-50px",left:"80px"}}>platform</p>
               <p className="date-text" style={{top:"-70px",left:"80px"}}>date</p>
               <p className="question" style={{top:"-65px",aligntext:"center"}}>
                 Event details asnd dshdfl hfkldjflk jhklajfkla kjfklajfkl jhlafklksj jhklfj
                 <button type="submit" style={{position:"relative",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Register</button>
                 <button type="submit" style={{position:"relative",left:"20px",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Remind</button>
               </p>
             </div>
            </div>
            <div className="card-pos">
            <div className="event-card">
                <div className="title">Event Name</div>
                <div className="avatar"><img src="/images/codechef.jpg" className="image-size1"/></div>
                  <p className="username" style={{top:"-50px",left:"80px"}}>platform</p>
                  <p className="date-text" style={{top:"-70px",left:"80px"}}>date</p>
                  <p className="question" style={{top:"-65px",aligntext:"center"}}>
                    Event details asnd dshdfl hfkldjflk jhklajfkla kjfklajfkl jhlafklksj jhklfj
                    <button type="submit" style={{position:"relative",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Register</button>
                    <button type="submit" style={{position:"relative",left:"20px",top:"80px", width:"100px",background:" rgb(34, 133, 79)"}}className="btn btn-primary btn-block">Remind</button>
                  </p>
                </div>
              </div>
              <div className="card-pos">
               <div className="event-card"></div>
              </div>
               <div className="card-pos">
                <div className="event-card"></div>
               </div>
               <div className="card-pos">
                 <div className="event-card"></div>
               </div>
               <div className="card-pos">
                <div className="event-card"></div>
               </div>
               <div className="card-pos">
                <div className="event-card"></div>
               </div>
               <div className="card-pos">
                <div className="event-card"></div>
               </div>
                <div className="card-pos">
                <div className="event-card"></div>
               </div>
               <div className="card-pos">
                <div className="event-card"></div>
               </div>
             </div>
           </div>
         <div className="about-description" id="about">
          <div className="grad-text" >About</div>
         </div>
         <div className="connect-body" id="connect">
           <hr className="line2"></hr>
           <div className="container row" style={{ width:"150%",textAlign:"center"}}>
            <div className="column">
              <h1 className="connect-text">
                <i className="fab fa-linkedin"></i> {' '}Linked In
                <p className="sub">@qwertyu</p>
             </h1>
             </div>
             <div className="column">
              <h1 className="connect-text">
                <i className="fab fa-facebook"></i>{' '} Facebook
                <p className="sub">@qwertyu</p>
              </h1>
            </div>
            <div className="column">
             <h1 className="connect-text">
               <i className="fab fa-instagram"></i>{' '}Instagram
               <p className="sub">@qwertyu</p>
             </h1>
            </div>
         </div>
       </div>
       <Chat></Chat>
</Layout>
  )
}
