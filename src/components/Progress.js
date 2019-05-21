import React, { useState, useRef, useEffect } from 'react';

function Progress() {

    const percentage = Math.floor(insertbitssofar / insertbitsrequired * 100) + "%";
    const style = {
        width: percentage
    }

    const reveal = () => {
        this.setState({
            isHidden: true,
            isVisible: true
        });
    }

    return (
        <>
            <div className="bgbar">
                <div className="childbar" style={style}>
                    <div className="dot"></div>
                </div>
            </div>
            <div id="authinfo">Raid target is: {this.state.target}</div>
            <div id="price">bits so far: {this.state.bitsRaised}</div>
            <div id="price">bits required: {this.state.price}</div>
            <div id="price">{ Math.floor(this.state.bitsRaised / this.state.price * 100) + "%" }</div>
            { !this.state.isHidden && <button id="reveal" onClick={this.reveal}>support raid</button> }
            { this.state.isVisible && <Products /> }
        </>
    );
}

export default Progress;
