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

    }

    componentDidMount() {
        window.Twitch.ext.onAuthorized(async auth => {
            // GET
            //const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/bitsraised?Id=${auth.channelId}&Task=${auth.channelId}`;
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
            // END OF GET

            async function twitchFetch(url) {
                const headers = new Headers({
                    'Client-ID': auth.clientId,
                    'Accept': "application/vnd.twitchtv.v5+json",
                    'Authorization': "Bearer " + auth.token
                });

                const options = {
                    method: "GET",
                    headers: headers
                };

                try {
                    const response = await fetch(url, options);
                    const data = await response.json();
                    return data;
                }

                catch (err) {
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

    post = () => {
        window.Twitch.ext.onAuthorized(async auth => {
            // POST
            const { price } = store.getState();
            const { target } = store.getState();
            const postURL = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks';
            fetch(postURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: auth.channelId,
                    task: price,
                    raidTarget: target
                })
            });
            // END OF POST
        });
    }

    realtime = (e) => {
        this.setState({
            price: e,
            buttonbg: '#9686d5',
            buttoncolor: '#000'
        });
    }

    myTarget = (e) => {
        this.setState({
            target: e,
            buttonbg: '#9686d5',
            buttoncolor: '#000'
        });
    }

    render() {
        const styles = {'background': this.state.buttonbg, 'color': this.state.buttoncolor }
        return (
            <React.Fragment>
                <div id="welcome">Hello and welcome, <span>Bootcamp{this.state.displayName}</span>!</div>
                <div className="section">
                    <form>
                        <label>
                            <span>Bits required for raid:</span>
                            <input type="text" pattern="[0-9]*" placeholder={this.state.price} onChange={(e) => {this.props.changePrice(e.target.value); this.realtime(e.target.value)}} />
                            <span>Raid target channel:</span>
                            <input type="text" placeholder={this.state.target} onChange={(e) => {this.props.changeTarget(e.target.value); this.myTarget(e.target.value)}} />
                        </label>
                    </form>
                    <button className="submit" style={styles} onClick={this.post}>save settings</button>
                </div>
                <div className="section">
                    <div id="price">Your raid's target channel is: <span>{this.state.target}</span></div>
                    <div id="price">bits raised: {this.state.bitsRaised}</div>
                    <div id="price">bits required: {this.state.price}</div>
                    <div id="price">{ Math.floor(this.state.bitsRaised / this.state.price * 100) + "%" }</div>
                </div>
            </React.Fragment>
        );
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
        },
        changeTarget: (value) => {
            dispatch({
                type: "CHANGE_TARGET",
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
