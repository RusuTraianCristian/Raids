import React, { Fragment, useContext } from 'react';
import { RaidsContext } from './Context';

const Raids = () => {

    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const percentage = Math.floor(bits / required * 100) + "%";
    const styles = {
        childbar: {
            width: percentage,
            height: '1px',
            background: '#9686d5',
            maxWidth: '100%',
            transition: 'width 1.5s ease-out',
            boxShadow: '0px 0px 17px 1px rgba(150,134,213, 1)'
        }
    }

    return (
        <Fragment>
            <div className="header">
                Use Bits to join the raid at the end of the stream!
            </div>
            <div className="wrapper">
                <div className="topinfo">
                    <div className="left">{ target }</div>
                    <div className="right"><span>{ bits }</span> / { required }</div>
                </div>
                <div className="bgbar">
                    <div className="childbar" style={styles.childbar}>
                        <div className="dot">
                            <div className="percent">
                                { Math.floor(bits / required * 100) + "%" }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Raids;
