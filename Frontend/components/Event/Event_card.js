import { Component, useState } from "react";
import style from "./event.module.css";
import moment from "moment";
import SetReminder from "./setreminder";
import Modal from "react-modal";

const eventsurl =
    process.env.NODE_ENV === "production"
        ? "//codestats-test.herokuapp.com/api/event/"
        : "http://localhost:8000/api/event/";
const savedeventsurl =
    process.env.NODE_ENV === "production"
    ? "//codestats-test.herokuapp.com/api/user/event/"
    : "http://localhost:8000/api/user/event/";

export default class EventsList extends Component {
    state = {
        eventCards: [],
        isLoggedIn: false,
        savedEvents: [],
    };

    componentDidMount() {
        let localval = localStorage.getItem('jwt');
        if(localval){
            this.setState({isLoggedIn:true});
            localval = JSON.parse(localval);
            fetch(savedeventsurl + localval.user._id,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localval.token}`
                }
            })
            .then(data=>data.json())
            .then(events=>{
                if(!Object.prototype.hasOwnProperty.call(events,"err")){
                    this.setState({savedEvents:events});
                    console.log(events);
                }
            })
        }
        fetch(eventsurl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
        .then((data) => data.json())
        .then((events) => {
            if (Object.prototype.hasOwnProperty.call(events,"error")) {
                console.log("Couldn't Fetch Event Data");
                return;
            }
            this.setState({eventCards: events});
            // console.log(events);
        })
        .catch((err) => {
            console.log("Couldn't Fetch Event Data", err);
        });
    }
    render() {
        return (
            <div className={style.row}>
                {
                    this.state.eventCards.map((event, index) => {
                // console.log("Events Page",event);
                    let isSaved = false;
                    if(this.state.savedEvents.findIndex(el=>el._id===event._id)!==-1 ){
                        isSaved = true;
                    }
                    console.log(isSaved, this.state.savedEvents, event);
                    return (
                        <div key={index} className={style.column}>
                            <Card props={event} isSaved={isSaved} isLoggedIn={this.state.isLoggedIn}/>
                        </div>
                        );
                    })
                }
            </div>
        );
    }
}

export function Card({ props, isSaved , isLoggedIn}) {
    // console.log("Card Func");
    // console.log(props);
    const [showReminder, setShowReminder] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => {
        setShowReminder(false);
        // setShowAlert(false);
    };

    const removeSavedEvent = () =>{
        fetch
        setShowAlert(false);
    }

    let cleardate = moment(props.date).format("Do MMMM YYYY"),
        cleartime = moment(props.date).format("h:mm:ss a");
    return (
        <>
            <div className={style.event_card}>
                <div className="title">{props.title}</div>
                <div className={style.avatar}>
                    <img src="/images/download.jpg" className="image-size1" />
                </div>
                <p className={style.platform}>{props.location}</p>
                <p className={style.date}>{cleardate}</p>
                <p className={style.time}>{cleartime}</p>
                <div className={style.question}>{props.description || ""}</div>
                <div className={style.bottom}>
                    <div className={style.register}>
                        <button
                            type="submit"
                            className={`btn btn-primary ${style["btn-block"]}`}
                        >
                            Register
                        </button>
                    </div>
                    {isLoggedIn && !isSaved && (
                        <div className={style.reminder}>
                            <button
                                type="submit"
                                className={`btn btn-primary ${style["btn-block"]}`}
                                onClick={() => setShowReminder(true)}
                            >
                                Save
                            </button>
                        </div>
                    )}
                    {isLoggedIn && isSaved && (
                        <div className={style.reminder}>
                            <button
                                type="submit"
                                className={`btn btn-alert ${style["btn-block"]}`}
                                onClick={() => setShowAlert(true)}
                            >
                                Remove
                            </button>
                        </div>    
                    )}

                </div>
            </div>
            <Modal 
                isOpen={showAlert}
                onRequestClose={()=>setShowAlert(false)}
                overlayClassName={style["modal-overlay"]}
                className={style["modal-content"]}
                >
                <div className={`${style["title"]} justify-content-center`}>
                    <h3>Remove Event From Saved List?</h3>
                    <p className="mx-3">This will also Delete all your saved Reminders of this Event.</p>
                    <button 
                        className={`btn btn-danger my-4`}
                        onClick={removeSavedEvent}
                        >
                        Confirm
                    </button>
                </div>
            </Modal>
            <SetReminder isOpen={showReminder} handleClose={handleClose} eventId={props._id} eventTime={props.date}/>
        </>
    );
}
