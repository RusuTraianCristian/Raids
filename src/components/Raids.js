import React, { Fragment, useContext } from 'react';
import { RaidsContext } from './Context';

const Raids = () => {

    const { bits, required, target } = useContext(RaidsContext);

    return (
        <RaidsContext.Consumer>
            {context =>
                <Fragment>
                    bits are: {bits} and required are: {required} and target is: {target}
                </Fragment>
            }
        </RaidsContext.Consumer>
    );
}

export default Raids;
