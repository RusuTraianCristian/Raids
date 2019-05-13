import React from "react";
import "./Panel.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";
import Products from '../Products';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    } // end of constructor

    componentDidMount() {
        window.Twitch.ext.onAuthorized(async auth => {
            // GET
            //const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks?Id=${auth.channelId}&Task=${auth.channelId}`;
            fetch(getURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    price: data.Bits,
                    bitsRaised: data.BitsRaised,
                    target: data.RaidTarget
                });
            })
            .catch(error => console.error(error));
            // END of GET

            async function twitchFetch(url) {
              const headers = new Headers({
                'Client-ID': auth.clientId,
                'Accept': "application/vnd.twitchtv.v5+json",
                'Authorization': "Bearer " + auth.token
              });

              const options = { method: "GET", headers: headers };

              try {
                const response = await fetch(url, options);
                const data = await response.json();
                return data;
              } catch (err) {
                console.error(err);
              }
              return undefined;
            }

            async function getDisplay(userId) {
                const url = `https://api.twitch.tv/helix/users?id=${userId}`;
                const result = await twitchFetch(url);
                return result;
            }

            const userData = await getDisplay(auth.channelId);
            const displayName = userData.data[0].display_name;

            this.setState({
                displayName: displayName
            });
        });
    } // end of componentDidMount

    reveal = () => {
        this.setState({
            isHidden: true,
            isVisible: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="bgbar">
                    <div className="childbar">
                        <div className="dot"></div>
                    </div>
                </div>
                <div id="authinfo">{this.state.displayName} will raid: {this.state.target}</div>
                <div id="price">bits raised: {this.state.bitsRaised}</div>
                <div id="price">bits required: {this.state.price}</div>
                <div id="price">{ Math.floor(this.state.bitsRaised / this.state.price * 100) + "%" }</div>
                { !this.state.isHidden && <button id="reveal" onClick={this.reveal}>Contribute</button> }
                { this.state.isVisible && <Products /> }
            </React.Fragment>
        ); // end of return
    } // end of render
} // end of component

// stores persistent information in localStorage whenever an action is dispatched

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// exports the component

export default Panel;
