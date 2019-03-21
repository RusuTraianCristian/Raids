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
    } // end of constructor

    componentDidMount() {

        window.Twitch.ext.onContext(context => {

        });

        window.Twitch.ext.onAuthorized(auth => {

        });

        window.Twitch.ext.onError(e => console.error(e));

        console.log(`Running ${window.Twitch.ext.version} on ${window.Twitch.ext.environment}`);

        window.Twitch.ext.onAuthorized(async function(auth) {

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

            document.getElementById('raid500').innerHTML = `${products[3].cost.amount} ${products[3].cost.type}`;
            document.getElementById('raid1000').innerHTML = `${products[0].cost.amount} ${products[0].cost.type}`;
            document.getElementById('raid2000').innerHTML = `${products[2].cost.amount} ${products[2].cost.type}`;
            document.getElementById('raid5000').innerHTML = `${products[4].cost.amount} ${products[4].cost.type}`;
            document.getElementById('raid10000').innerHTML = `${products[1].cost.amount} ${products[1].cost.type}`;

            const mappedProducts = products.map((number) =>
                <li>{ number }</li>
            );
        }); // end of products list

    } // end of componentDidMount

    // calls a Bits product based on Sku (id arg)

    buyRaid(id) {
        window.Twitch.ext.bits.getProducts().then(function(products) {
            console.log(products);
            let productSku = products[id].sku;
            Twitch.ext.bits.useBits(productSku);
        });
    } // end of use Bits function

    render() {
        return (
            <React.Fragment>
                <div id="Config">
                    <form>
                        <label>
                            <input type="text" pattern="[0-9]*" placeholder="0" onChange={(e) => this.props.changePrice(e.target.value)} />
                        </label>
                    </form>
                    <div id="price">Stream ends in: {this.state.price}</div>
                    <div id="authinfo"></div>
                    <div id="raid500" onClick={this.buyRaid.bind(this, 3)}></div>
                    <div id="raid1000" onClick={this.buyRaid.bind(this, 0)}></div>
                    <div id="raid2000" onClick={this.buyRaid.bind(this, 2)}></div>
                    <div id="raid5000" onClick={this.buyRaid.bind(this, 4)}></div>
                    <div id="raid10000" onClick={this.buyRaid.bind(this, 1)}></div>
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
            document.getElementById('price').innerHTML = 'Stream ends in: ' + store.getState().price;
        }
    }
}

// stores persistent information in localStorage whenever an action is dispatched

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// exports the component and its mapped functions

export default connect(mapStateToProps, mapDispatchToProps)(Config);
