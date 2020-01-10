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
    const setValues = async () => {
        const header = {
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
        }
        const url = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids';
        const response = await fetch(url, header);
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
        const getAWS = async () => {
            const header = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            const url = `https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/raids?Id=${channelId}&Task=${channelId}`;
            await fetch(url, header).then(async res => await res.json()).then(data => { currentInfo = data; getInfo() });
        }
        getAWS();
    }, []);

    return (
        <Fragment>
            <div className="section">
                <form>
                    <label>
                        <span className="labels">Bits for raid:</span>
                        <input type="text" pattern="[0-9]*" placeholder={required} onChange={(e) => changeRequired(e.target.value)}/>
                    </label>
                    <label>
                        <span className="labels">Raid this channel:</span>
                        <input type="text" placeholder={target} onChange={(e) => changeTarget(e.target.value)}/>
                    </label>
                </form>
                <button className="save" onClick={() => setValues()}>Save Settings</button>
                <button className="reset" onClick={() => resetRaid()}>Reset Raid</button>
                {target && required ? "settings done" : target ? "set required" : required ? "set target" : "set required and target"}
            </div>
        </Fragment>
    );
}

export default Settings;
