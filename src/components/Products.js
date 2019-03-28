import React from 'react';

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // start of Bits
        window.Twitch.ext.bits.getProducts().then(function(products) {
            const newArr = products.map(item => {
                return item.cost.amount;
            });
            newArr.sort((a, b) => a - b);
            newArr.forEach(item => {
                document.getElementById("options").innerHTML += '<div id="raid">' + item + '</div>';
            });
        }); // end of Bits
    }

    buyRaid(id) {
        window.Twitch.ext.bits.getProducts().then(function(products) {
            let productSku = products[id].sku;
            Twitch.ext.bits.useBits(productSku);
        });
    } // end of use Bits function

    render() {
        return (
            <React.Fragment>
                <div id="options"></div>
                <div id="raid" onClick={this.buyRaid.bind(this, 3)}></div>
            </React.Fragment>
        );
    }
}

export default Products;
