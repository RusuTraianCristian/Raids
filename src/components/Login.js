import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: ''
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>muie ma{this.state.price}</div>
        );
    }
}

export default Login;
