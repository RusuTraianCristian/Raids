import React, { Fragment } from 'react';
import './Allow.less';
import Settings from './Settings';

const Allow = (props) => {
    return (
        <Fragment>
            <div className="allow">
                <Settings username={props.username}/>
            </div>
        </Fragment>
    );
}

export default Allow;
