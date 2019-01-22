import React from "react";
import "./Panel.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    render() {
        return (
            <div id="Panel">
                <div className="welcomeHeadline">Host service price (in bits):</div>
                <div id="price">Price currently is: {this.props.price}</div>
            </div>
        );
    }
}

export default Panel;
