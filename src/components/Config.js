import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import firebase from '../firebase';
import "./Config.css";
import { onAuthorized } from '../Twitch';
import Raids from './Raids';

function Config() {
    const RaidsContext = React.createContext(null);

    const [authorized, setAuthorized] = useState({});
    const [bits, setBits] = useState(0);
    const [info, setInfo] = useState({});

    const { token, clientId, channelId, userId } = authorized;
    const { required, target } = info;

    const ath = useRef(0);
    const bit = useRef(0);
    const inf = useRef(0);

    let currentAuth = ath.current;
    let currentBits = bit.current;
    let currentInfo = inf.current;

    const getAuthorized = () => {
        setAuthorized({...currentAuth});
    }
    const getBits = () => {
        setBits(currentBits);
    }
    const getInfo = () => {
        setInfo({...currentInfo});
    }

    useEffect(() => {
        // Twitch
        const auth = onAuthorized;
        currentAuth = auth;
        getAuthorized();
        const channelId = auth.channelId;
        // Firebase
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.on("value", (snapshot) => {
            currentBits = JSON.stringify(snapshot.val(), null, 2);
            getBits();
        });
        // AWS
        const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids?Id=${channelId}&Task=${channelId}`;
        fetch(getURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            currentInfo = data;
            getInfo();
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <Fragment>
            <RaidsContext.Provider value={bits}>
                <Raids />
            </RaidsContext.Provider>
            <div id="price">component with current live raid with graph</div>
            <div id="price">component with settings able to change target and required and reset bits</div>
        </Fragment>
    );
}

export default Config;
