import React from "react";
import "./VideoComponent.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";

class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    } // end of constructor

    componentDidMount() {

        window.Twitch.ext.actions.requestIdShare();

        window.Twitch.ext.onAuthorized(async auth => {

            const userId = auth.userId;
            const token = auth.token;

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
            const login = userData.data[0].login;

            document.getElementById('authinfo').innerHTML = `Hello there, ${displayName}! Thank you for using our awesome extension. Your channel ID is: ${auth.channelId} and user's ID is ${auth.userId}`;
        });

        // Bits

        // gets all Bits products

        window.Twitch.ext.bits.getProducts().then(function(products) {
            console.log(products);

            document.getElementById('raid').innerHTML = `${products[3].cost.amount} ${products[3].cost.type}`;

            const mappedProducts = products.map((number) =>
                <li>{ number }</li>
            );
        }); // end of products list

    } // end of componentDidMount

    // calls a Bits product based on Sku (id arg)

    buyRaid(id) {
        window.Twitch.ext.bits.getProducts().then(function(products) {
            let productSku = products[id].sku;
            Twitch.ext.bits.useBits(productSku);
        });
    } // end of use Bits function

    render() {
        return (
            <React.Fragment>
                <div id="VideoComponent">
                    <div id="price">Stream ends in: {this.state.price}</div>
                    <div id="authinfo"></div>
                    <div id="raid" onClick={this.buyRaid.bind(this, 3)}></div>
                </div>
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
