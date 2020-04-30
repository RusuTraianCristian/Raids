import React, { Fragment, useState, useRef, useEffect } from 'react';
import { getAuth } from '../Twitch';
import firebase from '../firebase';
import './Sections.less';
import Themes from './Themes';

const Settings = props => {

    const [authorized, setAuthorized] = useState({});
    const [info, setInfo] = useState({});
    const [custom, setCustom] = useState({});
    const [theState, setTheState] = useState(true);
    const [infoArea, setInfoArea] = useState("");
    const [theColor, setTheColor] = useState({});
    const [tab, setTab] = useState('tab1');
    const [bits, setBits] = useState(0);


    const { token, clientId, channelId, userId } = authorized;
    const { required, target } = info;

    const ath = useRef(0);
    const inf = useRef(0);
    const focusNext = useRef();
    const focusSave = useRef();

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
        const res = await fetch(url, header);
        greenLine();
    }
    const greenLine = () => {
        setInfoArea("Settings saved!");
        setTheColor({ color: "#43cc92" });
        setTimeout(() => {
            setTheColor({ display: 'none' });
        }, 3000);
    }

    const changeRequired = e => {
        setInfo({...info, required: e});
    }
    const changeTarget = e => {
        setInfo({...info, target: e});
    }

    const focusTheNext = event => {
        if (event.key === "Enter") {
            focusNext.current.focus();
        }
    }

    const focusTheSave = event => {
        if (event.key === "Enter") {
            focusSave.current.focus();
            setCustom({ ...custom, 'boxShadow': '0px 0px 17px 1px rgba(150,134,213, 0.75)' });
        }
    }

    useEffect(() => {
        // Twitch
        const auth = getAuth();
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
            const res = await fetch(url, header);
            const data = await res.json();
            currentInfo = data;
            getInfo();
        }
        getAWS();
        // Firebase
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.on("value", (snapshot) => {
            let currentBits = JSON.stringify(snapshot.val(), null, 2);
            getBits(currentBits);
        });
    }, []);

    useEffect(() => {
        if (target && required) {
            setInfoArea("");
            setCustom({ ...custom, 'cursor': 'pointer' });
            setTheState(false);
        } else if (target && !required) {
            setInfoArea("Set bits amount needed for raid.");
            setCustom({ ...custom, 'cursor': 'not-allowed' });
            setTheState(true);
        } else if (!target && required) {
            setInfoArea("Set a target channel to raid.");
            setCustom({ ...custom, 'cursor': 'not-allowed' });
            setTheState(true);
        } else if (!target && !required) {
            setInfoArea("Set bits required for raid and a raid target.");
            setCustom({ ...custom, 'cursor': 'not-allowed' });
            setTheState(true);
        }
    }, [target, required]);

    const getBits = (theAmount) => {
        setBits(theAmount);
    }

    return (
        <Fragment>
            <div className="tab_container">
                <input id="tab1" type="radio" name="tabs" value="tab1" onChange={e => setTab(e.target.value)} checked={tab === "tab1"} />
                <label id="lab1" for="tab1"><span>Live</span></label>
                <input id="tab2" type="radio" name="tabs" value="tab2" onChange={e => setTab(e.target.value)} checked={tab === "tab2"} />
                <label id="lab2" for="tab2"><span>Settings</span></label>
                <input id="tab3" type="radio" name="tabs" value="tab3" onChange={e => setTab(e.target.value)} checked={tab === "tab3"} />
                <label id="lab3" for="tab3"><span>Theme/Color</span></label>

                <div className="username">{ props.username }</div>

                <section id="content1" className="tab-content">
                    <div>currently raised { bits } bits out of { required }</div>
                    <div className="buttons">
                        <button className="reset" onClick={() => resetRaid()}>reset</button>
                    </div>
                </section>

                <section id="content2" className="tab-content">
                    <form>
                        <label>
                            <span className="labels">bits:</span>
                            <input type="text" pattern="[0-9]*" placeholder={ required } onKeyPress={ focusTheNext } onChange={e => changeRequired(e.target.value)}/>
                        </label>
                        <label>
                            <span className="labels">channel:</span>
                            <input type="text" placeholder={ target } onKeyPress={ focusTheSave } ref={ focusNext } onChange={e => changeTarget(e.target.value)}/>
                        </label>
                    </form>
                    <button className="save" style={ custom } disabled={ theState } ref={ focusSave } onClick={() => setValues()}>save</button>
                    <div className="infoarea" style={ theColor }>{ infoArea }</div>
                </section>

                <section id="content3" className="tab-content">
                    <Themes />
                </section>
            </div>
        </Fragment>
    );
}

export default Settings;
