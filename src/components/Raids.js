import React, { Fragment, useContext } from 'react';
import { RaidsContext } from './Context';

const Raids = () => {
    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const percentage = Math.floor(bits / required * 100) + "%";
    const styles = {
        childbar: {
            width: percentage,
            height: '24px',
            maxWidth: '100%',
            transition: 'width 1.5s ease-out'
        }
    }

    return (
        <Fragment>
            <div className="bgbar">
                <div className="childbar shine" style={ styles.childbar }></div>
            </div>
            <div className="second">
                <div className="bits">{ bits }</div>
                <div className="required">{ required }</div>
                <div className="percentage">{ percentage }</div>
            </div>
            <div className="header">
                <div className="incentive">next raid</div>
                <div className="target">{ target }</div>
            </div>
        </Fragment>
    );
}

export default Raids;
