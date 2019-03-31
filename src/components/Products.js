import React from 'react';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
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
    }

    buyRaid(e) {
        window.Twitch.ext.bits.getProducts().then(products => {
            Twitch.ext.bits.useBits(`raid${e}`);
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
