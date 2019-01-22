import React from "react";
import "./LiveConfig.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";

class LiveConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (store.getState().price === '') {
            document.getElementById('price').innerHTML = 'Price must be higher than 0.';
            event.preventDefault();
        }
        else {
            document.getElementById('price').innerHTML = '&#10004; Current price is set to: ' + store.getState().price + ' bits.';
            event.preventDefault();
        }
    }

    render() {
        return (
            <div id="LiveConfig">
                <div className="welcomeHeadline">Host service price (in bits):</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" pattern="[0-9]*" placeholder="0" onChange={(e) => this.props.changePrice(e.target.value)} />
                    </label>
                    <input type="submit" value="Set Price" />
                </form>
                <div id="price">Price currently is: {this.props.price}</div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveConfig);
