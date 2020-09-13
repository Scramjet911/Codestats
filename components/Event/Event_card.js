import { Component } from "react";
import styles from "./event.module.css";
import moment from 'moment'

const eventsurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/events/":"http://localhost:8000/api/events/";

export default class EventsList extends Component{
    state={
        eventCards:null
    }
    
    componentDidMount(){
        fetch(eventsurl,{
            method:"GET",
            headers:{
                'Accept':'application/json'
            }
        })
        .then(data=>data.json())
        .then(events=>{
            if(events.hasOwnProperty("error")){
                console.log("Couldn't Fetch Event Data");
                return;
            }
            this.setState({eventCards:events.map((event,index)=>{
                // console.log("Events Page",event);
                return (
                    <div key={index} className={styles.column}>
                        <Card props={event}/>
                    </div>
                );
            })});
            // console.log(eventCards[0].props.children);
        })
        .catch(err=>{
            console.log("Couldn't Fetch Event Data",err);
        });
    }
    render(){
        return(
            <div className={styles.row}>
                {this.state.eventCards}
            </div>
        );
    }
}

export function Card({props}) {
    console.log("Card Func");
    console.log(props);
    let cleardate = moment(props.date).format("Do MMMM YYYY"),
        cleartime = moment(props.date).format("h:mm:ss a");
    return (
        <div className={styles.event_card}>
            <div className="title">{props.title}</div>
            <div className={styles.avatar}>
                <img src="/images/download.jpg" className="image-size1" />
            </div>
            <p className={styles.platform}>{props.location}</p>
            <p className={styles.date}>{cleardate}</p>
            <p className={styles.time}>{cleartime}</p>
            <div className={styles.question}>
                {props.description || ""}
            </div>
            <div className={styles.bottom}>
                <div className={styles.register}>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                    >
                        Register
                    </button>
                </div>
                <div className={styles.reminder}>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                    >
                        Remind
                    </button>
                </div>
            </div>
        </div>
    );
}
