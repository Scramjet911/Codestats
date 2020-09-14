import Router, { withRouter } from "next/router";
const { Component } = require("react");

let discussurl = (process.env.NODE_ENV==="production")?"//codestats-test.herokuapp.com/api/discussion/":"http://localhost:8000/api/discussion/";


class DiscussList extends Component{
    state={
        discusslist:[]
    }
    componentDidMount(){
        fetch(discussurl,{
            method:"GET",
            headers:{
                'Accept':'application/json'
            }
        })
        .then(data=>data.json())
        .then(discussions=>{
            if(discussions.hasOwnProperty("err")){
                console.log("Server Error");
                return;
            }
            this.setState({discusslist:discussions});
        })
        .catch(err=>console.error(err));
    }

    openDiscuss = (discuss)=>{
        this.props.router.push({
            pathname:'/discussion/view',
            query:{discId:discuss._id}
        });
    }

    render(){
        let discussions = this.state.discusslist.map((d,i)=>{
            let categories = d.category.map((cat, j)=>
                <p key={j} className="tags-discuss">{cat}</p>
            );
            return(
                <div key={i}>
                    <div className="row">
                        <div className="col-7 pl-4 ">
                            <p className="text-discuss" onClick={()=>this.openDiscuss(d)}>
                                {d.body}
                            </p>
                            {categories}
                        </div>
                        <div className="col-3">
                            <img
                                src="/images/avatar.png"
                                className="image-discuss"
                            />
                            <img
                                src="/images/loginImg.JPG"
                                className="image-discuss"
                            />
                            <img
                                src="/images/codechef.jpg"
                                className="image-discuss"
                            />
                            <img
                                src="/images/codechef.jpg"
                                className="image-discuss"
                            />
                        </div>
                        <div className="col-1">69</div>
                        <div className="col-1">3d</div>
                        <div className="col-1"></div>
                    </div>
                    <hr className="hr" />
                </div>
            );
        });
        return(
            <>
                {discussions}
            </>
        );
    }
}
export default withRouter(DiscussList)