import React, { Fragment } from 'react';
import './Reject.less';

const Reject = props => {
    return (
        <Fragment>
            <div className="reject">
                Sorry <span>{ props.username }</span>, you are not a partner/affiliate. You'll need a bits enabled channel before using <span>Raids</span>.
                Learn more at <span><a target="_blank" href="https://affiliate.twitch.tv/">Twitch Affiliates &#129109;</a></span>
            </div>
        </Fragment>
    );
}

export default Reject;
