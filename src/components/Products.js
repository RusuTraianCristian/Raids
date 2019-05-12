import React from 'react';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            auth: {}
        };
    }

    componentDidMount() {
        window.Twitch.ext.bits.getProducts().then(products => {
            let newArr = products.map(item => {
                return item.cost.amount;
            });
            newArr.sort((a, b) => a - b);
            return newArr;
        }).then((newArr) => {
            this.setState({
                options: [...newArr]
            });
        });
        window.Twitch.ext.onAuthorized(auth => {
            this.setState({
                auth: {...auth}
            });
        });
    }

    buyRaid(e) {
        const bitsRaisedUrl = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/bitsraised';
        window.Twitch.ext.bits.getProducts().then(products => {
            Twitch.ext.bits.useBits(`raid${e}`);
            // START of POST
            window.Twitch.ext.bits.onTransactionComplete(TransactionObject => {
                const setBitsRaised = TransactionObject.product.cost.amount;
                const who = TransactionObject.displayName;
                fetch(bitsRaisedUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.auth.channelId,
                        setBitsRaised: setBitsRaised
                    })
                }).then(response => {this.sendExtensionChatMessage(who, setBitsRaised)});
            });
            // END of POST
        });
    }

    sendExtensionChatMessage = (who, bitsSent) => {
        const twitchUrl = `https://api.twitch.tv/extensions/${this.state.auth.clientId}/0.0.1/channels/${this.state.auth.channelId}/chat`;
        fetch(twitchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.auth.token,
                'Client-ID': this.state.auth.clientId
            },
            body: JSON.stringify({
                'text': `${who} supported the raid with ${bitsSent} bits.`
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="options">{this.state.options.map(item => (<div id="raid" key={item} onClick={this.buyRaid.bind(this, item)}>{item}</div>))}</div>
            </React.Fragment>
        );
    }
}

export default Products;
