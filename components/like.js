import React from "react";

export default class LikeButton extends React.Component {
    state = {
        likes: 0,
        dislikes: 0,
        color: "white",
        red: "red",
        color2: "white",
        white: "white",
        black: "rgba(0, 0, 0, 0.719)",
    };
    addLike = () => {
        if (this.state.likes == 1) {
            this.setState({
                likes: this.state.likes - 1,
            });
            this.setState({ color: this.state.white });
        } 
        else {
            this.setState({
                likes: this.state.likes + 1,
            });
            this.setState({ color: this.state.red });
        }
    };
    adddislike = () => {
        if (this.state.dislikes == 1) {
            this.setState({
                dislikes: this.state.dislikes - 1,
            });
            this.setState({ color2: this.state.white });
        } 
        else {
            this.setState({
                dislikes: this.state.dislikes + 1,
            });
            this.setState({ color2: this.state.black });
        }
    };

    render() {
        return (
            <div>
                <i
                    id="like"
                    onClick={this.addLike}
                    class="fa fa-heart"
                    style={{
                        position: "relative",
                        left: "20px",
                        color: this.state.color,
                        fontSize: "20px",
                    }}
                >
                    {" "}
                    {this.state.likes}
                </i>{" "}
                <i
                    id="dislike"
                    onClick={this.adddislike}
                    class="fas fa-heart-broken"
                    style={{
                        position: "relative",
                        left: "30px",
                        color: this.state.color2,
                        fontSize: "20px",
                    }}
                >
                    {" "}
                    {this.state.dislikes}
                </i>
            </div>
        );
    }
}
