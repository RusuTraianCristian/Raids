import React, { Fragment, useState, useRef, useEffect } from 'react';
import './Checkpoint.less';
import { getAuth } from '../Twitch';
import Allow from './Allow';
import Reject from './Reject';

const Checkpoint = () => {
    const [authorized, setAuthorized] = useState({});
    const [blob, setBlob] = useState({});
    const ath = useRef(0);
    const blb = useRef(0);

    let currentAuth = ath.current;
    let currentBlob = blb.current;

    const getAuthorized = () => {
        setAuthorized({...currentAuth});
    }
    const getBlob = () => {
        setBlob({...currentBlob});
    }

    const { broadcaster_type, display_name } = blob;
    const { userId, channelId, clientId, token } = authorized;

    useEffect(() => {
        // Twitch
        const auth = getAuth();
        currentAuth = auth;
        getAuthorized();
        const channelId = auth.channelId;
        const clientId = auth.clientId;
        const token = auth.token;
        // check whether the current user is partner or affiliate
        const getInfo = async () => {
            const header = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Client-ID': clientId
                }
            }
            const url = `https://api.twitch.tv/helix/users?id=${channelId}`;
            const res = await fetch(url, header);
            const data = await res.json();
            currentBlob = data.data[0];
            getBlob();
        }
        getInfo();
    }, []);

    return (
        <Fragment>
            { broadcaster_type ? <Reject username={display_name}/> : <Allow username={display_name}/> }
        </Fragment>
    );
}

export default Checkpoint;
