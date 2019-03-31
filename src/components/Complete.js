import React from 'react';

class Complete extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.Twitch.ext.bits.onTransactionComplete(TransactionObject => {
            const bitspool = TransactionObject.product.cost.amount;
            // POST
            window.Twitch.ext.onAuthorized(async auth => {
                    fetch('https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: auth.channelId,
                            bitspool: bitspool
                        })
                    });
            }); // END of POST
        });
    }

    render() {
        return (
            <React.Fragment>
            Hey!
            </React.Fragment>
        );
    }
}

export default Complete;
