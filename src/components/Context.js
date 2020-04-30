import React, { Fragment, useState, useRef, useEffect } from 'react';
import { getAuth } from '../Twitch';
import firebase from '../firebase';
import Raids from './Raids';
import Products from './Products';
export const RaidsContext = React.createContext({});

const Context = () => {

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
        const auth = getAuth();
        currentAuth = auth;
        getAuthorized();
        const channelId = auth.channelId;
        // Firebase
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.on("value", (snapshot) => {
            currentBits = JSON.stringify(snapshot.val(), null, 2);
            getBits();
        });
        const getAWS = async () => {
            // AWS
            const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids?Id=${channelId}&Task=${channelId}`;
            const header = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            const res = await fetch(getURL, header);
            const data = await res.json();
            currentInfo = data;
            getInfo();
        }
        getAWS();
    }, []);

    return (
        <Fragment>
            <RaidsContext.Provider value={ { bits, required, target, channelId, userId, clientId, token } }>
                <Raids />
                <Products />
            </RaidsContext.Provider>
        </Fragment>
    );
}

export default Context;
