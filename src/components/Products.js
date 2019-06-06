import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import { RaidsContext } from './Context';
import firebase from '../firebase';

const Products = () => {

    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const [products, setProducts] = useState([]);
    const prod = useRef(0);
    let currentProducts = prod.current;
    const getProducts = () => {
        setProducts([...currentProducts]);
    }

    const buyRaid = (e) => {
        window.Twitch.ext.bits.getProducts().then(products => {
            Twitch.ext.bits.useBits(`raid${e}`);
            window.Twitch.ext.bits.onTransactionComplete(TransactionObject => {
                const amount = TransactionObject.product.cost.amount;
                const raider = TransactionObject.displayName;
                sendExtensionChatMessage(raider, amount);
                pushBits(amount);
            });
        });
    }

    const sendExtensionChatMessage = (raider, amount) => {
        const twitchUrl = `https://api.twitch.tv/extensions/${clientId}/0.0.1/channels/${channelId}/chat`;
        fetch(twitchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Client-ID': clientId
            },
            body: JSON.stringify({
                'text': `${raider} supported the raid with ${amount} bits. Visit https://raids.app for more information.`
            })
        });
    }

    const pushBits = (arg) => {
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.transaction(current => {
            return current + arg;
        });
    }

    useEffect(() => {
        window.Twitch.ext.bits.getProducts().then(products => {
            let newArr = products.map(item => {
                return item.cost.amount;
            });
            newArr.sort((a, b) => a - b);
            return newArr;
        }).then((newArr) => {
            currentProducts = newArr;
            getProducts();
        });
    }, []);

    return (
        <Fragment>
            <div className="products">{products.map(item => (<div id="raid" key={ item } onClick={() => buyRaid(item)}>{ item } bits</div>))}</div>
        </Fragment>
    );
}

export default Products;
