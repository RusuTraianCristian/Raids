import React, { useState, useRef, useEffect } from 'react';
import firebase from '../firebase.js';
import "./Panel.css";
import Products from './Products';

function Panel() {

    // componentDidMount() {
    //     const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks?Id=${this.state.auth.channelId}&Task=${this.state.auth.channelId}`;
    //     window.Twitch.ext.onAuthorized(auth => {
    //         this.setState({
    //             auth: {...auth}
    //         });
    //     });
    //
    //     fetch(getURL, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         this.setState({
    //             price: data.Bits,
    //             target: data.RaidTarget
    //         });
    //     })
    //     .catch(error => console.error(error));
    //
    //     async function twitchFetch(url) {
    //       const headers = new Headers({
    //         'Client-ID': this.state.auth.clientId,
    //         'Accept': "application/vnd.twitchtv.v5+json",
    //         'Authorization': "Bearer " + this.state.auth.token
    //       });
    //
    //       const options = { method: "GET", headers: headers };
    //
    //       try {
    //         const response = await fetch(url, options);
    //         const data = await response.json();
    //         return data;
    //       } catch (err) {
    //         console.error(err);
    //       }
    //       return undefined;
    //     }
    //
    //     async function getDisplay(userId) {
    //         const url = `https://api.twitch.tv/helix/users?id=${userId}`;
    //         const result = await twitchFetch(url);
    //         return result;
    //     }
    //
    //     // const userData = await getDisplay(this.state.auth.channelId);
    //     // const displayName = userData.data[0].display_name;
    //     //
    //     // this.setState({
    //     //     displayName: displayName
    //     // });
    //
    //     // firebase
    //     const channelId = this.state.auth.channelId;
    //     const ref = firebase.database().ref('channels/').child(channelId);
    //     ref.on("value", (snapshot) => {
    //         const currentData = JSON.stringify(snapshot.val(), null, 2);
    //         this.setState({
    //             bitsRaised: currentData
    //         });
    //     });
    //     // firebase
    // } // end of componentDidMount

    // const reveal = () => {
    //     this.setState({
    //         isHidden: true,
    //         isVisible: true
    //     });
    // }
    //
    const percentage = 2;//Math.floor(this.state.bitsRaised / this.state.price * 100) + "%";
    const style = {
        width: percentage
    }

    const [authorized, setAuthorized] = useState({});
    const { clientId, token, channelId, userId } = authorized;
    const auth = useRef(0);
    let currentAuth = auth.current;

    const getAuthorized = () => {
        setAuthorized({...currentAuth});
    }

    useEffect(() => {
        // get the { auth } object from Twitch // set state for further reference
        window.Twitch.ext.onAuthorized(auth => {
            currentAuth = auth;
            getAuthorized();
        });
    }, []);

    return (
        <React.Fragment>
            <div id="price">{clientId}</div>
            <div id="price">{token}</div>
            <div id="price">{channelId}</div>
            <div id="price">{userId}</div>
        </React.Fragment>
    );
    // return (
    //     <React.Fragment>
    //         <div className="bgbar">
    //             <div className="childbar" style={style}>
    //                 <div className="dot"></div>
    //             </div>
    //         </div>
    //         <div id="authinfo">{this.state.displayName} will raid: {this.state.target}</div>
    //         <div id="price">bits raised: {this.state.bitsRaised}</div>
    //         <div id="price">bits required: {this.state.price}</div>
    //         <div id="price">{ Math.floor(this.state.bitsRaised / this.state.price * 100) + "%" }</div>
    //         { !this.state.isHidden && <button id="reveal" onClick={this.reveal}>support raid</button> }
    //         { this.state.isVisible && <Products /> }
    //     </React.Fragment>
    // );
}

export default Panel;
