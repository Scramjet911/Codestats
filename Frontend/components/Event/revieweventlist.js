import {Component} from 'react'

const revieweventurl = 
    process.env.NODE_ENV === "production"
    ? "//codestats-test.herokuapp.com/api/review-event/"
    : "http://localhost:8000/api/review-event/";

export default class EventList extends Component{
    state = {
        events:[],
        loaded:false
    }

    componentDidMount(){
        let storeval = localStorage.getItem('jwt')
        if(storeval){
            storeval = JSON.parse(storeval);
            fetch(revieweventurl + `${storeval.user._id}`, {
                method : "GET",
                headers : {
                    'Authorization' : `Bearer ${storeval.token}`,
                    'Accept' : "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then(data=>{
                if(data.status==500){
                    console.log("Server Error");
                }
                else{
                    data.json().then(eventlist=>{
                        this.setState({events:eventlist});
                        this.setState({loaded:true});
                    });
                }
            })
            .catch(err=>console.log(err));
        }
    }

    approveEvent = ()=>{

    }

    render(){
        return (
            this.state.loaded && (
            <>
                {this.state.events.map((event, index)=>{
                    return (
                        <div key={index}>
                            <div className="row">
                                <div className="col-7">
                                    <h3>{event.title}</h3>
                                    <p>
                                        <a>{event.location}</a>
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p>{event.date} To</p>
                                    <p>{event.date}</p>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn-sm btn-outline-light "
                                        href="#"
                                        role="button"
                                        onClick={this.approveEvent}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn-sm btn-outline-danger "
                                        href="#"
                                        role="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })}
            </>
            )
        )
    }
}