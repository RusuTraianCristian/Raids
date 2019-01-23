import React from "react";
import "./LiveConfig.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";
import Login from "../Login.js";

class LiveConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    render() {
        return (
            <React.Fragment>
                <Login />
                <div id="LiveConfig"></div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        price: state.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePrice: (value) => {
            dispatch({
                type: "CHANGE_PRICE",
                payload: value
            });
            document.getElementById('price').innerHTML = '&#10004; Current price is set to: ' + store.getState().price + ' bits.';
        }
    }
}

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default LiveConfig;
