import React from "react";
import { Register } from "./login/index";
import Login from './login/login'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
    };
  }
 
  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("left");
  }
 
  changeState() {
    const { isLogginActive } = this.state;
 
    if (isLogginActive) {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
      } else {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }
 
  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Sign In" : "Sign Up";
    const currentActive = isLogginActive ? "Sign Up" : "Sign In";
    return (

          <div> 
          <div id="center" ref={(ref) => (this.container = ref)}>
            {isLogginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Login containerRef={(ref) => (this.current = ref)} />
            )}
          </div>
       
         <div className="switch">
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        
      </div>
      </div>
    );
  }
}
 
const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};
 
export default SignUp;