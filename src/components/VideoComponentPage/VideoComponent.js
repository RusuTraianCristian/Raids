import React from "react";
import "./VideoComponent.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";
import Products from '../Products';

class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    } // end of constructor

    componentDidMount() {

        window.Twitch.ext.actions.requestIdShare();

        window.Twitch.ext.onAuthorized(async auth => {

            // GET BITSRAISED
            const url2 = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/bitsraised?Id=${auth.channelId}&Task=${auth.channelId}`;
            fetch(url2, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    bitsRaised: data.BitsRaised
                });
            })
            .catch(error => console.error(error));
            // END OF GET BITS RAISED

            // GET
            const url = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks?Id=${auth.channelId}&Task=${auth.channelId}`;
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    price: data.Bits
                });
            })
            .catch(error => console.error(error));
            // END OF GET

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

            document.getElementById('authinfo').innerHTML = `Hello, you are on ${displayName}'s channel!`;
        });
    } // end of componentDidMount

    render() {
        return (
            <React.Fragment>
                    <div id="price">Bits for raid: {this.state.price} Currently there are {this.state.bitsRaised} bits raised.</div>
                    <div id="authinfo"></div>
                    <svg className="tw-icon__svg" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><path d="M9.592 9.081L3 11.802l6.122-9.336A1.05 1.05 0 0 1 10 2c.357 0 .688.176.878.466L17 11.802l-6.592-2.72a1.077 1.077 0 0 0-.816 0zM10 11l6 2.638-5.407 4.16a.973.973 0 0 1-1.186 0L4 13.638 10 11z" fillRule="evenodd"></path></svg>
                    <Products />
            </React.Fragment>
        ); // end of return
    } // end of render
} // end of component

// stores persistent information in localStorage whenever an action is dispatched

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// exports the component

export default VideoComponent;
