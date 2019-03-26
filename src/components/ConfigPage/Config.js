import React from "react";
import "./Config.css";
import { connect } from "react-redux";
import store from "../../store/index";
import { CHANGE_PRICE } from "../../constants/action-types";
import { changePrice } from "../../actions";

class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.post = this.post.bind(this);
    } // end of constructor

    componentDidMount() {

        window.Twitch.ext.onAuthorized(async auth => {

            const userId = auth.userId;
            const token = auth.token;

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

            document.getElementById('authinfo').innerHTML = `Hello there, ${displayName}! Thank you for using our awesome extension. Your channel ID is: ${auth.channelId}`;
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

    post() {
        window.Twitch.ext.onAuthorized(async auth => {
            setTimeout(() => {
                // POST
                const { price } = store.getState();
                fetch('https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: auth.channelId,
                        task: price
                    })
                });
            }, 2000);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="Config">
                    <form>
                        <label>
                            <input type="text" pattern="[0-9]*" placeholder="0" onChange={(e) => {this.props.changePrice(e.target.value); this.post()}} />
                        </label>
                    </form>
                    <div id="price">Bits for raid: {this.state.price}</div>
                    <div id="authinfo"></div>
                </div>
            </React.Fragment>
        ); // end of return
    } // end of render
} // end of component

// maps state to be accessible via props

const mapStateToProps = (state) => {
    return {
        price: state.price
    }
}

// maps dispatch to be accessible via props

const mapDispatchToProps = (dispatch) => {
    return {
        changePrice: (value) => {
            dispatch({
                type: "CHANGE_PRICE",
                payload: value
            });
            document.getElementById('price').innerHTML = 'Bits for raid: ' + store.getState().price;
        }
    }
}

// stores persistent information in localStorage whenever an action is dispatched

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// exports the component and its mapped functions

export default connect(mapStateToProps, mapDispatchToProps)(Config);
