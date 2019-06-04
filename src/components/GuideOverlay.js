import React, { Fragment, useState } from 'react';

const GuideOverlay = () => {

    const [guide, setGuide] = useState({ display: localStorage.getItem('display') });

    const hideGuide = () => {
        setGuide({ display: 'none' });
        localStorage.setItem('display', 'none');
    }

    return (
        <Fragment>
            <div className="guideOverlay" style={guide}>
                <div className="header">
                    Thanks for installing <span>Raids</span> and being awesome!
                </div>
                <div className="content">
                    <div className="guide">
                        <p><span>*</span> Using <span>Raids</span> is as simple as setting two values and pressing one button, literally.</p>
                        <p><i className="far fa-check-circle"></i>Set the amount of bits required for raid and a Twitch channel as the raid target.</p>
                        <p><i className="far fa-check-circle"></i>Save settings and inform your viewers about the upcoming raid.</p>
                        <p><i className="far fa-check-circle"></i>Watch as the goal is reached and raid the target with your viewers. Have fun!</p>
                        <p><span>*</span> Only press the red button to reset stats after a successful raid.</p>
                    </div>
                    <button className="hideGuide" onClick={() => hideGuide()}>Let's go!</button>
                </div>
            </div>
        </Fragment>
    );
}

export default GuideOverlay;
