import React, { Fragment, useContext } from 'react';
import { RaidsContext } from './Context';

const Raids = () => {

    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const percentage = Math.floor(bits / required * 100) + "%";
    const styles = {
        wrapper: {
            border: '2px solid #9686d5',
            borderRadius: '4px',
            padding: '55px 0',
            color: '#9686d5',
            fontSize: '14px',
            fontFamily: 'Arial',
            width: 'calc(100% - 6px)'
        },
        topinfo: {
            margin: '0 8%',
            width: '84%',
            height: '1px',
            background: 'transparent',
            color: '#9686d5'
        },
        left: {
            float: 'left',
            marginTop: '-30px'
        },
        right: {
            float: 'right',
            marginTop: '-30px'
        },
        span: {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        bgbar: {
            margin: '0 8%',
            width: '84%',
            height: '1px',
            background: '#ffffff'
        },
        childbar: {
            width: percentage,
            height: '1px',
            background: '#9686d5',
            maxWidth: '100%',
            transition: 'width 1.5s ease-out',
            boxShadow: '0px 0px 17px 1px rgba(150,134,213, 1)'
        },
        dot: {
            height: '7px',
            width: '7px',
            background: '#9686d5',
            marginTop: '-3px',
            borderRadius: '50%',
            float: 'right',
            cursor: 'pointer',
            boxShadow: '0px 0px 17px 1px rgba(150,134,213, 1)'
        },
        percent: {
            color: '#9686d5',
            textAlign: 'center',
            position: 'absolute',
            marginTop: '20px',
            width: '57px',
            marginLeft: '-25px'
        }
    }

    return (
        <Fragment>
            <div className="wrapper" style={styles.wrapper}>
                <div className="topinfo" style={styles.topinfo}>
                    <div className="left" style={styles.left}>raid <span style={styles.span}>{ target }</span></div>
                    <div className="right" style={styles.right}><span style={styles.span}>{ bits }</span> / { required }</div>
                </div>
                <div className="bgbar" style={styles.bgbar}>
                    <div className="childbar" style={styles.childbar}>
                        <div className="dot" style={styles.dot}>
                            <div className="percent" style={styles.percent}>
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
