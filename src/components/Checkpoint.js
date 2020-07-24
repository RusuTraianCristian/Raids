import React, { Fragment, useState, useRef, useEffect } from 'react';
import './Checkpoint.less';
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

    const { userId, channelId, clientId, token } = authorized;
    const { broadcaster_type, display_name } = blob;

    useEffect(() => {
        window.Twitch.ext.onAuthorized(auth => {
            currentAuth = auth;
            getAuthorized();
            const { userId, channelId, clientId, token } = auth;
            const getInfo = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Client-ID': clientId
                    }
                }
                const url = `https://api.twitch.tv/helix/users?id=${channelId}`;
                const res = await fetch(url, options);
                const data = await res.json();
                currentBlob = data.data[0];
                getBlob();
            }
            getInfo();
        });
    }, []);

    return (
        <Fragment>
            { broadcaster_type ? <Allow username={display_name}/> : <Reject username={display_name}/> }
        </Fragment>
    );
}

export default Checkpoint;
