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
                }).then(response => {this.sendExtensionChatMessage(setBitsRaised)});
            });
            // END of POST
        });
    }

    sendExtensionChatMessage = (eb) => {
        fetch(`https://api.twitch.tv/extensions/${this.state.auth.clientId}/0.0.1/channels/${this.state.auth.channelId}/chat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.auth.token,
                'Client-ID': this.state.auth.clientId
            },
            body: JSON.stringify({
                'text': `${this.state.auth.userId} supported the raid with ${eb} bits.`
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
