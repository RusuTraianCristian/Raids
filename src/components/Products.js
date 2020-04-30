import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import { RaidsContext } from './Context';
import firebase from '../firebase';

const Products = () => {
    const [success] = useState(new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"));
    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const [products, setProducts] = useState([]);
    const [idx, setIdx] = useState(5);
    const prod = useRef(0);
    let currentProducts = prod.current;
    const getProducts = () => {
        setProducts([...currentProducts]);
    }

    const buyRaid = e => {
        window.Twitch.ext.bits.getProducts().then(products => {
            Twitch.ext.bits.useBits(`raid${e}`);
            window.Twitch.ext.bits.onTransactionComplete(TransactionObject => {
                const amount = TransactionObject.product.cost.amount;
                const raider = TransactionObject.displayName;
                sendExtensionChatMessage(raider, amount);
                pushBits(amount);
                success.play();
            });
        });
    }

    const sendExtensionChatMessage = async (raider, amount) => {
        const url = `https://api.twitch.tv/extensions/${clientId}/1.0.0/channels/${channelId}/chat`;
        const header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Client-ID': clientId
            },
            body: JSON.stringify({
                'text': `${raider} is supporting the community and has used ${amount} bits to raid ${ target }.`
            })
        }
        const res = await fetch(url, header);
    }

    const pushBits = arg => {
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.transaction(current => {
            return current + arg;
        });
    }

    useEffect(() => {
        window.Twitch.ext.bits.getProducts().then(products => {
            let memo = products.map(item => {
                return item.cost.amount;
            });
            memo.sort((a, b) => a - b);
            return memo;
        }).then(memo => {
            currentProducts = memo;
            getProducts();
        });
    }, []);

    const prev = () => idx > 0 ? setIdx(idx - 1) : "";
    const next = () => idx < products.length - 1 ? setIdx(idx + 1) : "";

    return (
        <Fragment>
            <div className="container">
                <button className="prev" onClick={prev}>-</button>
                <button className="next" onClick={next}>+</button>
                <button className="idx" onClick={ () => buyRaid(products[idx]) }>join with <span>{ products[idx] }</span> bits</button>
            </div>
        </Fragment>
    );
}

export default Products;
