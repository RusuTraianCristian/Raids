import React, { Fragment, useState, useRef, useEffect } from 'react';
import { onAuthorized } from '../Twitch';
import firebase from '../firebase';

const Settings = () => {

    const [authorized, setAuthorized] = useState({});
    const [info, setInfo] = useState({});

    const { token, clientId, channelId, userId } = authorized;
    const { required, target } = info;

    const ath = useRef(0);
    const inf = useRef(0);

    let currentAuth = ath.current;
    let currentInfo = inf.current;

    const getAuthorized = () => {
        setAuthorized({...currentAuth});
    }
    const getInfo = () => {
        setInfo({...currentInfo});
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
                required: required,
                target: target
            })
        });
    }

    const changeRequired = (e) => {
        setInfo({...info, required: e});
    }
    const changeTarget = (e) => {
        setInfo({...info, target: e});
    }

    useEffect(() => {
        // Twitch
        const auth = onAuthorized;
        currentAuth = auth;
        getAuthorized();
        const channelId = auth.channelId;
        // AWS
        const getURL = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids?Id=${channelId}&Task=${channelId}`;
        const header = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(getURL, header)
        .then(res => res.json())
        .then(data => {
            currentInfo = data;
            getInfo();
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <Fragment>
            <div className="section">
                <form>
                    <label>
                        <span className="labels">Set bits required to raid:</span>
                        <input type="text" pattern="[0-9]*" placeholder={required} onChange={(e) => changeRequired(e.target.value)}/>
                    </label>
                    <label>
                        <span className="labels">Set raid target channel:</span>
                        <input type="text" placeholder={target} onChange={(e) => changeTarget(e.target.value)}/>
                    </label>
                </form>
                <button className="save" onClick={() => setValues()}>Save Settings</button>
                <button className="reset" onClick={() => resetRaid()}>Reset Raid</button>
            </div>
        </Fragment>
    );
}

export default Settings;
