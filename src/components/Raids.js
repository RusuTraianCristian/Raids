import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import { RaidsContext } from './Config';

const Raids = () => {
    return (
        <RaidsContext.Consumer>
            {value => (<div>{value}</div>)}
        </RaidsContext.Consumer>
    );
}

export default Raids;
