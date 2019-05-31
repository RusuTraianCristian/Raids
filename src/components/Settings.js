import React, { Fragment, useState, useRef, useEffect } from 'react';
import { onAuthorized } from '../Twitch';
import firebase from '../firebase';

const Settings = () => {

    const [authorized, setAuthorized] = useState({});
    const [required, setRequired] = useState(0);
    const [target, setTarget] = useState('');
    const { token, clientId, channelId, userId } = authorized;
    const ath = useRef(0);
    const req = useRef(0);
    const tar = useRef(0);
    let currentAuth = ath.current;
    let currentRequired = req.current;
    let currentTarget = tar.current;
    const getAuthorized = () => {
        setAuthorized({...currentAuth});
    }
    const getRequired = (e) => {
        currentRequired = e;
        setRequired(currentRequired);
    }
    const getTarget = (e) => {
        currentTarget = e;
        setTarget(currentTarget);
    }

    const resetRaid = () => {
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.set(0);
    }
    const setValues = () => {
        const postURL = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids';
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: channelId,
                task: channelId,
                required: required,
                target: target
            })
        });
    }

    useEffect(() => {
        // Twitch
        const auth = onAuthorized;
        currentAuth = auth;
        getAuthorized();
        const channelId = auth.channelId;
    }, []);

    return (
        <Fragment>
            <div className="section">
                <form>
                    <label>
                        <input type="text" pattern="[0-9]*" placeholder={required} onChange={(e) => {getRequired(e.target.value)}}/>
                    </label>
                    <label>
                        <input type="text" placeholder={target} onChange={(e) => {getTarget(e.target.value)}}/>
                    </label>
                </form>
                <button className="submit" onClick={() => setValues()}>save settings</button>
                <button className="reset" onClick={() => resetRaid()}>Reset Raid</button>
            </div>
        </Fragment>
    );
}

export default Settings;
