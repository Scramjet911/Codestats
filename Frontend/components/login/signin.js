import React from "react";
import Login from "./login";
import Register from "./register";
import style from './login.module.css'
import Modal from "react-modal";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: props.issignin
        };
    }
    componentDidMount(){
        this.setState({isOpen:this.props.isOpen});
    }
    changeState() {
        this.setState((prevState) => ({
            isLogginActive: !prevState.isLogginActive,
        }));
    }

    render() {
        const { isLogginActive } = this.state;
        // const current = isLogginActive ? "Sign Up" : "Sign In";
        // const currentActive = isLogginActive ? "Sign In" : "Sign Up";
        return (
            <div className={style["wrapper"]}>
                <ul className={style["switch"]}>
                    <li className={this.state.isLogginActive? "" : style["switch-disable"]}>
                        <a onClick={()=>this.setState({isLogginActive:true})}>Sign in</a>
                    </li>
                    <li className={this.state.isLogginActive?style["switch-disable"]:""}>
                        <a onClick={()=>this.setState({isLogginActive:false})}>New account</a>
                    </li>
			    </ul>
                    {isLogginActive && (
                        <Login containerRef={(ref) => (this.current = ref)} />
                    )}
                    {!isLogginActive && (
                        <Register
                            containerRef={(ref) => (this.current = ref)}
                        />
                    )}
                
                {/* <div className={style.switch}> */}
                    {/* <RightSide
                        current={current}
                        currentActive={currentActive}
                        containerRef={(ref) => (this.rightSide = ref)}
                        onClick={this.changeState.bind(this)}
                        className={`${this.state.isLogginActive? style["right"] : style["left"]}`}
                    /> */}
                {/* </div> */}
            </div>
        );
    }
}

const RightSide = (props) => {
    return (
        <div
            className={props.className}
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className={style["inner-container"]}>
                <div className={style["text"]}>{props.current}</div>
            </div>
        </div>
    );
};

export default SignIn;
