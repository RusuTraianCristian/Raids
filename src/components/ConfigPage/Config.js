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

        window.Twitch.ext.onAuthorized(async auth => {

            // GET BITSRAISED
            const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/bitsraised?Id=${auth.channelId}&Task=${auth.channelId}`;
            fetch(getURL, {
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

    post() {
        window.Twitch.ext.onAuthorized(async auth => {
            setTimeout(() => {
                // POST
                const { price } = store.getState();
                const postURL = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks';
                fetch(postURL, {
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
    } // END OF POST

    render() {
        return (
            <React.Fragment>
                    <div id="authinfo">{this.state.displayName}</div>
                    <div id="price">Bits raised: {this.state.bitsRaised}. Bits required: {this.state.price}.</div>
                    <form>
                        <label>
                            <input type="text" pattern="[0-9]*" placeholder="0" onChange={(e) => {this.props.changePrice(e.target.value); this.post()}} />
                        </label>
                    </form>
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
        }
    }
}

// stores persistent information in localStorage whenever an action is dispatched

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// exports the component and its mapped functions

export default connect(mapStateToProps, mapDispatchToProps)(Config);
