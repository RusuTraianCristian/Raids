import React, { Fragment } from 'react';
import './Config.less';
import GuideOverlay from './GuideOverlay';
import Settings from './Settings';

const Config = () => {
    return (
        <Fragment>
            <GuideOverlay />
            <Settings />
        </Fragment>
    );
}

export default Config;
