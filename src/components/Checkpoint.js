import React, { Fragment, useState, useRef, useEffect } from 'react';
import './Checkpoint.less';
import { onAuthorized } from '../Twitch';
import Allow from './Allow';
import Reject from './Reject';

const Checkpoint = () => {

    const [blob, setBlob] = useState({});
    const blb = useRef(0);

    let currentBlob = blb.current;

    const getBlob = () => {
        setBlob({...currentBlob});
    }

    const { broadcaster_type, display_name } = blob;
    const { userId, channelId, clientId, token } = onAuthorized;

    useEffect(() => {
        const usersEndpoint = `https://api.twitch.tv/helix/users?id=${channelId}`;
        const header = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Client-ID': clientId
            }
        }
        fetch(usersEndpoint, header)
        .then(res => res.json())
        .then(data => {
            currentBlob = data.data[0];
            getBlob();
        })
    }, []);

    return (
        <Fragment>
            <div className="welcome">Hello, <span>{ display_name }</span>!</div>
            { broadcaster_type ? <Reject /> : <Allow /> }
        </Fragment>
    );
}

export default Checkpoint;
